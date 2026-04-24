const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// const executeCode = async ({ code, language, input }) => {
//   try {
//     const language_id = languageMap[language] || 93; // default JS

//     if (!language_id) {
//       throw new Error("Unsupported language");
//     }

//     const response = await axios.post(
//       JUDGE0_URL,
//       {
//         source_code: code,
//         language_id,
//         stdin: input,
//       },
//       { headers }
//     );

//     const result = response.data;

//     //  DEBUG (keep for now)
//     console.log("JUDGE0 FULL RESULT:", result);

//     //  Runtime error
//     if (result.stderr) {
//       return {
//         error: result.stderr,
//         output: null,
//       };
//     }

//     //  Compile error
//     if (result.compile_output) {
//       return {
//         error: result.compile_output,
//         output: null,
//       };
//     }

//     //  Other failure
//     if (result.status?.description !== "Accepted") {
//       return {
//         error: result.status?.description,
//         output:
//           result.stdout ||
//           result.message ||
//           "",
//       };
//     }

//     // SUCCESS (FIXED PART)
//     const output =
//       result.stdout ??
//       result.message ??
//       "";

//     return {
//       output: output.toString().trim(),
//       error: null,
//     };

//   } catch (err) {
//     return {
//       output: null,
//       error: err.message || "Execution failed",
//     };
//   }
// };
const executeCode = async ({ code, language, input }) => {
  return new Promise((resolve) => {
    try {
      // Only support JS for now
      if (language !== "javascript") {
        return resolve({
          output: null,
          error: "Only JavaScript supported currently",
        });
      }

      // Temp file path
      const filePath = path.join(__dirname, "tempCode.js");
//.
if (code.includes("fs.readFileSync") || code.includes("require(\"fs\")")) {
  return resolve({
    output: null,
    error: "Do not use fs.readFileSync. Use inputFn() instead.",
  });
}
      // Wrap code to handle input
      const wrappedCode = `
        const input = \`${input || ""}\`.trim().split(" ");
        let idx = 0;

        function inputFn() {
          return input[idx++];
        }

${code}
        `;

      // Write code to file
      fs.writeFileSync(filePath, wrappedCode);

      // Execute file
      // exec(`node ${filePath}`, { timeout: 3000 }, (err, stdout, stderr) => {
        exec(`node "${filePath}"`, { timeout: 3000 }, (err, stdout, stderr) => {
        // Cleanup
        fs.unlinkSync(filePath);

        if (err) {
          return resolve({
            output: null,
            error: stderr || err.message,
          });
        }

        return resolve({
          output: stdout.trim(),
          error: stderr ? stderr : null,
        });
      });

    } catch (error) {
      return resolve({
        output: null,
        error: error.message,
      });
    }
  });
};
module.exports = {
  executeCode,
};