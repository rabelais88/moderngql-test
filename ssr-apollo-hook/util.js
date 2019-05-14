
'use strict';

/**
 * Middleware to allow all sort of CORS request
 * only available for development environment
 * @param {Request} [req]
 * @param {Response} [res]
 * @param {function} [next]
 * @example
 * app.use(corsHandler)
 * */
exports.allowCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Authorization',
  );
  if (req.method === 'OPTIONS') {
    // Stop the middleware chain
    return res.status(200).end();
  }
  next();
};