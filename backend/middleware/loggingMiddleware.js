// Logging middleware for all requests
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const clientIP = req.ip || req.connection.remoteAddress;

  // Log request start
  console.log(`[${timestamp}] ${method} ${url} - IP: ${clientIP}`);

  // Capture response finish to log status code
  res.on('finish', () => {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${method} ${url} - Status: ${statusCode}`);
  });

  next();
};

module.exports = loggingMiddleware;
