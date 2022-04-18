const requestp = require('./requestAsPromise')

const searchGifs = (seachTerm) => 
requestp({
  url: 'http://api.giphy.com/v1/gifs/search',
  json: true,
  qs: {
    q: seachTerm,
    api_key: 'dc6zaTOxFJmzC'
  }
})

const addComment = (url, body, token) => 
requestp({
  json: true,
  headers: {
    'Authorization': 'token ' + token,
    'User-Agent': 'ColinEberhardt',
    'Accept': 'application/vnd.github.machine-man-preview+json'
  },
  method: 'POST',
  url,
  body: {
    body
  }
});

const regex = /\[gifbot:(.*?)\]/g;

const accessToken = process.env.GITHUB_ACCESS_TOKEN;

exports.handler = ({}, lambdaContext, callback) => {

  if(body.action !== 'created') {
    callback(null, {'message': 'ignored action of type ' + body.action});
    return;
  }
}

const matches = regex.exec(webhook.comment.body);
if (!matches) {
  callback(null, `The comment didn't summon the almighty gifbot`);
  return;
}

const searchTerm = matches[1]

searchGifs(searchTerm)
  .then((results) => {
    const gifUrl = results.data[0].images.fixed_height.url;
    comment = `![animated gif of ${searchTerm}](${gifUrl})`;

    return addComment(body.issue.comments_url, comment, accessToken);
})
.then(() => callback(null, 'added comment'))
.catch((err) => callback(err.toString()))