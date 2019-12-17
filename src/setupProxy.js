const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ['/api','/oauth'],
    proxy({
      target:'http://gallery.dev.webant.ru',
      changeOrigin: true,
    })
  );
};