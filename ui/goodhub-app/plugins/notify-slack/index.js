const https = require('https');

const sendToSlack = (message) => {
  const data = JSON.stringify({
    text: message
  })

  const options = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: '/services/T01TQESD09H/B01V5U2TTU6/1HydXxdFVPKVxr8EZ4ZUL7b9',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  return new Promise((resolve, reject) => {

    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        process.stdout.write(d)
      })

      res.on('end', () => resolve())
    })
    
    req.on('error', error => {
      reject(error);
    })
    
    req.write(data)
    req.end()
  })
}

module.exports = {
  onPreBuild: async ({ constants }) => {
    const { SITE_ID } = constants;
    await sendToSlack(`A new UI build has started for <https://app.netlify.com/sites/${SITE_ID}/deploys/${process.env.BUILD_ID}|"${process.env.SITE_NAME}" with target "${process.env.REACT_APP_BUILD_TARGET}">.`)
  },
  onError: async ({ constants }) => {
    const { SITE_ID } = constants;
    await sendToSlack(`Failed UI build & deploy for <https://app.netlify.com/sites/${SITE_ID}/deploys/${process.env.BUILD_ID}|"${process.env.SITE_NAME}">`)
  },
  onSuccess: async ({ constants }) => {
    const { SITE_ID } = constants;
    await sendToSlack(`Successful UI build & deploy for <https://app.netlify.com/sites/${SITE_ID}/deploys/${process.env.BUILD_ID}|"${process.env.SITE_NAME}">\nSee live site here -> <${process.env.URL}>`)
  }
}