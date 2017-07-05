module.exports = {
  runtimeCaching: [{
    urlPattern: /^https:\/\/cnodejs\.org\/api\/v1\/topics/,
    handler: 'networkFirst'
  },{
    urlPattern: /^https:\/\/cnodejs\.org\/public\/images\/cnodejs_light\.svg/,
    handler: 'cacheFirst'
  },{
    urlPattern: /avatar/,
    handler: 'cacheFirst',
  }]
}

