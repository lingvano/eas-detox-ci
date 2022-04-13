const fs = require('fs');
const path = require('path');

fs.readFile(
  path.resolve(__dirname, 'buildOutput.txt'),
  'UTF-8',
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const buildUrl = data.match(/buildUrl": "(.*)"/)[1];
    if (buildUrl) {
      console.log(buildUrl);
      process.exit(0);
    }

    process.exit(1);
  }
);
