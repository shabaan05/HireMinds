const { executeCode } = require("../services/codeExecutionService");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.runCode = asyncHandler(async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    throw new AppError("Code and language are required", 400);
  }

  const result = await executeCode({ code, language, input });

  res.status(200).json({
    success: true,
    data: result,
  });
});
