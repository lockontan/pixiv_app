module.exports = {
  apps : [
    {
      name      : 'pixiv',
      script    : 'app.js',
      watch     : true,
      env: {
        NODE_ENV: 'development',
        NODE_APP_INSTANCE: 'development'
      }
    }
  ]
}
