const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Always log to terminal so silent 500s are visible
  if (statusCode >= 500) {
    console.error("─────────────────────────────────────────");
    console.error(`[errorHandler] ❌ ${statusCode} on ${req.method} ${req.originalUrl}`);
    console.error("[errorHandler] Message:", err.message);
    console.error("[errorHandler] Stack:\n", err.stack);
    console.error("─────────────────────────────────────────");
  } else {
    console.warn(`[errorHandler] ⚠️  ${statusCode} on ${req.method} ${req.originalUrl} — ${err.message}`);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;