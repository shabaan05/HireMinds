const axios = require("axios");

const JUDGE0_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

const headers = {
  "content-type": "application/json",
  
};

// Map your frontend language → Judge0 language_id
const languageMap = {
  javascript: 63,
  python: 71,
};

const executeCode = async ({ code, language, input }) => {
  try {
    const language_id = languageMap[language];

    if (!language_id) {
      throw new Error("Unsupported language");
    }

    const response = await axios.post(
      JUDGE0_URL,
      {
        source_code: code,
        language_id,
        stdin: input,
      },
      { headers }
    );

    const result = response.data;

    // Handle different outcomes
    if (result.stderr) {
      return {
        error: result.stderr,
        output: null,
      };
    }

    if (result.compile_output) {
      return {
        error: result.compile_output,
        output: null,
      };
    }

    return {
      output: result.stdout,
      error: null,
    };
  } catch (err) {
    return {
      output: null,
      error: err.message || "Execution failed",
    };
  }
};

module.exports = {
  executeCode,
};