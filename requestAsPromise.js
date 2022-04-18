const request = require('request');

module.exports = (opts) => new Promise((resolve, reject) => {
  console.log('API Request', opts.url, opts.body || {} );
  request(opts, (err, response) => {
    if(err) {
      reject(err.toString());
    } else if( reponse && response.statusCode && response.statusCode.toString().startsWith('2')) {
      reject(new Error(`API request ${opts.url} failed with status ${response.statusCode}`));
    }else {
      resolve(body);
    }
  })
})