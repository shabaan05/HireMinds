const JUDGE0_URL =
  process.env.JUDGE0_URL || "https://ce.judge0.com";

const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

const LANGUAGE_IDS = {
  javascript: 63,
};

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const executeCode = async ({ code, language, input }) => {
  try {
    if (!LANGUAGE_IDS[language]) {
      return {
        output: null,
        error: `Unsupported language: ${language}`,
        status: "error",
      };
    }

    // Candidate code uses inputFn() to read tokens.
    // Split on ALL whitespace (spaces AND newlines) so both
    // manual "2 3" and test-case "2\n3" input formats work correctly.
    const tokens = (input || "").trim().split(/\s+/);

    console.log("[executeCode] raw input:", JSON.stringify(input || ""));
    console.log("[executeCode] tokens after split:", JSON.stringify(tokens));

    const wrappedCode = `
const input = ${JSON.stringify(tokens)};
let idx = 0;

function inputFn() {
  return input[idx++];
}

${code}
`;

    const headers = {
      "Content-Type": "application/json",
    };

    // If using RapidAPI
    if (process.env.JUDGE0_RAPID_API_KEY) {
      headers["X-RapidAPI-Key"] =
        process.env.JUDGE0_RAPID_API_KEY;

      headers["X-RapidAPI-Host"] =
        process.env.JUDGE0_RAPID_API_HOST ||
        "judge0-ce.p.rapidapi.com";
    }

    // If using a self-hosted/authorized Judge0 instance
    if (JUDGE0_API_KEY) {
      headers["X-Auth-Token"] = JUDGE0_API_KEY;
    }

    // 1. Create submission
    const submitResponse = await fetch(
      `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          source_code: wrappedCode,
          language_id: LANGUAGE_IDS[language],
          stdin: input || "",
        }),
      }
    );

    if (!submitResponse.ok) {
      const errorText = await submitResponse.text();

      throw new Error(
        `Judge0 submission failed (${submitResponse.status}): ${errorText}`
      );
    }

    const submission = await submitResponse.json();

    const token = submission.token;

    if (!token) {
      throw new Error("Judge0 did not return a submission token");
    }

    console.log("Judge0 submission token:", token);

    // 2. Poll Judge0 until execution finishes
    let result;

    for (let i = 0; i < 20; i++) {
      await sleep(1000);

      const resultResponse = await fetch(
        `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`,
        {
          method: "GET",
          headers,
        }
      );

      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();

        throw new Error(
          `Judge0 result failed (${resultResponse.status}): ${errorText}`
        );
      }

      result = await resultResponse.json();

      console.log(
        "Judge0 status:",
        result.status?.id,
        result.status?.description
      );

      // Status 1 = In Queue, Status 2 = Processing
      if (result.status?.id > 2) {
        break;
      }
    }

    if (!result) {
      throw new Error("No result received from Judge0");
    }

    // 3. Still processing after all polls
    if (result.status?.id === 1 || result.status?.id === 2) {
      return {
        output: null,
        error: "Judge0 execution timed out",
        status: "timeout",
      };
    }

    // 4. Runtime / compilation error
    if (result.stderr || result.compile_output || result.message) {
      return {
        output: result.stdout || "",
        error:
          result.stderr ||
          result.compile_output ||
          result.message,
        status: result.status?.description || "error",
      };
    }

    // 5. Successful execution
    return {
      output: (result.stdout || "").trim(),
      error: null,
      status: result.status?.description || "Unknown",
    };

  } catch (error) {
    console.error("Judge0 execution error:", error);

    return {
      output: null,
      error: error.message,
      status: "error",
    };
  }
};

module.exports = {
  executeCode,
};
