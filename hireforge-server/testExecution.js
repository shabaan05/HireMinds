const { executeCode } = require("./services/codeExecutionService");

(async () => {
  const result = await executeCode({
    code: `
      const fs = require("fs");
      const input = fs.readFileSync(0, "utf-8").trim().split(" ");
      const a = Number(input[0]);
      const b = Number(input[1]);
      console.log(a + b);
    `,
    language: "javascript",
    input: "2 3",
  });

  console.log(result);
})();