const { evaluateCode } = require("./services/evaluationService");

(async () => {
  const result = await evaluateCode({
    code: `
      const fs = require("fs");
      const input = fs.readFileSync(0, "utf-8").trim().split(" ");
      console.log(Number(input[0]) + Number(input[1]));
    `,
    language: "javascript",
    testCases: [
      { input: "2 3", output: "5" },
      { input: "1 4", output: "5" },
    ],
    totalMarks: 10,
  });

  console.log(result);
})();