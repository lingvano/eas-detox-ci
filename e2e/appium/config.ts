import appConfig from '../../app.json';

const platformName = process.env.PLATFORM || 'android';
const deviceName = process.env.DEVICE; // e.g. 'Pixel_4_API_29' for Android;

// Local, absolute path or remote URL to an app.
const app = process.env.APP_URL;

const automationName = platformName === 'android' ? 'UiAutomator2' : 'XCUITest';

export const appiumConfig = {
  app,
  platformName,
  deviceName,
  avd: deviceName,
  automationName,
  appActivity: appConfig.expo.android.package + '.MainActivity',
  appWaitForLaunch: true,
};
