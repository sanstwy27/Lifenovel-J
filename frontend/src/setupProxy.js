// [Version 0.X]
// const proxy = require('http-proxy-middleware');
// [Version 1.X]
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'XXXXXXXX',
      changeOrigin: true,
    })
  );
};