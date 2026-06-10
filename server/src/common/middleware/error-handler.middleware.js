export const errorHandler = async (err, req, res, next) => {

  const statusCode = err.statusCode || 500;

  const errorResponse = {
    success: false,
    error: {
      statusCode,
      message: err.message || "Internal Server Error.",
      ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
    }
  }

  res.status(statusCode).json(errorResponse)
}
