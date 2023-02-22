# ⚠️⚠️ Archive ⚠️⚠️

Unfortunately we never got this project running on a production level. In the meanwhile we have decided to use [Maestro](https://maestro.mobile.dev/) for mobile E2E testing and absolutely love it. You can check out our progress [here](https://github.com/lingvano/react-native-eas-maestro).

# Run Detox in CI with EAS build

This project includes example workflows for showing how to run detox tests in a CI environment with Github Actions.

## Prerequisites

- You use `eas build` from expo to run your app builds

## Commands

```bash
# Run build for simulator
eas build --platform ios --profile development-sim

# Run detox tests
yarn detox test --configuration ios
```

## Trigger CI workflow via EAS Build webhooks

To avoid a long running workflow, we trigger the tests to run whenever we receive a webhook from **EAS Build** telling us that our build is finished.

Here is an example in **_Node.js_** using **_Express.js_** for how we can accept **EAS Build webhooks** and trigger our detox test run workflow within Github Actions:

```js
const express = require('express');
const crypto = require('crypto');
const safeCompare = require('safe-compare');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.text({ type: '*/*' }));

app.post('/', async (req, res) => {
  const expoSignature = req.headers['expo-signature'];

  if (!isSignatureValid(expoSignature)) {
    res.status(500).send("Signatures didn't match!");
  }

  const downloadUrl = req.body.artifacts.buildUrl;

  try {
    const response = await triggerGithubWorkflow(downloadUrl);
    console.log(response);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }

  res.status(200).send('success');
});
exports.handleWebhook = app;

async function triggerGithubWorkflow(downloadUrl) {
  const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/',
    timeout: 2000,
    headers: {
      authorization: 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
    },
  });

  const response = await githubApi.post(
    process.env.GITHUB_USER +
      '/' +
      process.env.GITHUB_REPO +
      '/actions/workflows/' +
      process.env.WORKFLOW_FILE_NAME +
      '/dispatches',
    {
      ref: 'master',
      inputs: {
        downloadUrl,
      },
    }
  );
  return response;
}

function isSignatureValid(expoSignature) {
  const hmac = crypto.createHmac('sha1', process.env.SECRET_WEBHOOK_KEY);
  const hash = `sha1=${hmac.digest('hex')}`;

  return safeCompare(expoSignature, hash);
}
```

## Further resources

- [How to trigger Github Actions from HTTP requests](https://dev.to/rikurouvila/how-to-trigger-a-github-action-with-an-htt-request-545)
- [EAS Build Webhooks](https://docs.expo.dev/eas/webhooks/)
