import { appiumConfig } from './config';
const wd = require('wd');

jest.setTimeout(100000);

const driver = wd.promiseChainRemote('localhost', 4723);

describe('Example Test', () => {
  beforeAll(async () => {
    await driver.init(appiumConfig);
    await driver.sleep(20000);
  });

  afterAll(async () => {
    await driver.deleteSession();
  });

  test('Smoke test', async () => {
    if (appiumConfig.platformName === 'android') {
      expect(await driver.hasElementByAccessibilityId('greeting')).toBe(true);
    } else if (appiumConfig.platformName === 'ios') {
      expect(await driver.hasElementByName('Hello world!')).toBe(true);
    } else {
      throw new Error('Unsupported platform');
    }
  });
});
