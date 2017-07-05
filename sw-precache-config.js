module.exports = {
  runtimeCaching: [{
    urlPattern: /^https:\/\/cnodejs\.org\/api\/v1\/topics/,
    handler: 'networkFirst'
  }]
}