const { createProxyMiddleware } = require('http-proxy-middleware');

const target = process.env.DOCKER_DEVELOPMENT ? 'http://platform:8000': 'https://api.thisissqueeze.com'

module.exports = function(app) {
  app.use(
    '/credentials',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    })
  );
  app.use(
    '/connectors',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    })
  );
  app.use(
    '/reporting',
    createProxyMiddleware({
      target: target,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost'
    })
  );
};


