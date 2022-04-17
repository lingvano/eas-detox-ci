import { appiumConfig } from './config';
const wd = require('wd');

jest.setTimeout(30000);

const driver = wd.promiseChainRemote('localhost', 4723);

describe('Example Test', () => {
  beforeAll(async () => {
    await driver.init(appiumConfig);
    await driver.sleep(2000);
  });

  afterAll(async () => {
    await driver.deleteSession();
  });

  test('Smoke test', async () => {
    expect(await driver.hasElementByAccessibilityId('greeting')).toBe(true);
  });
});
