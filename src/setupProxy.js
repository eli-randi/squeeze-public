const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/credentials',
    createProxyMiddleware({
      target: 'https://api.thisissqueeze.com',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    })
  );
  app.use(
    '/connectors',
    createProxyMiddleware({
      target: 'https://api.thisissqueeze.com',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    })
  );
  
};


