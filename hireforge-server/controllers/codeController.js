const { executeCode } = require("../services/codeExecutionService");

exports.runCode = async (req, res) => {
  try {
    const { code, language, input } = req.body;
console.log("req body", req.body)
    // Basic validation
    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    const result = await executeCode({ code, language, input });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Code execution failed",
    });
  }
};

