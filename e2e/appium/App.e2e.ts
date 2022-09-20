import { config } from './config';
const wd = require('wd');

jest.setTimeout(100000);

const driver = wd.promiseChainRemote('localhost', 4723);

describe('Example Test', () => {
  beforeAll(async () => {
    await driver.init(config);
    await driver.sleep(20000);
  });

  afterAll(async () => {
    await driver.deleteSession();
  });

  test('Smoke test', async () => {
    expect(await driver.hasElementByAccessibilityId('greeting')).toBe(true);
  });
});
