exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.code || 500
  res.status(statusCode).json({
    status: statusCode,
    message:
      err.message || 'An unknown error occurred',
  })
}
