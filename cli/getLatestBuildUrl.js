const { exec } = require('child_process');

const easCommand =
  'eas build:list --distribution=simulator --status=finished --platform=ios --limit=1 --json';

exec(easCommand, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
  if (stderr && !stderr.includes('please upgrade')) {
    console.log(`stderr: ${stderr}`);
    process.exit(1);
  }

  const buildUrl = stdout.match(/buildUrl": "(.*)"/)[1];
  if (buildUrl) {
    console.log(buildUrl);
    process.exit(0);
  }

  console.log('An unknown error occured');
  process.exit(1);
});
