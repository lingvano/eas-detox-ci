import appConfig from '../../app.json';

const getConfig = (platform: string | undefined) => {
  if (platform === 'ios') {
    return iOSConfig.getAppiumConfig();
  } else if (platform === 'android') {
    return AndroidConfig.getAppiumConfig();
  }
  throw new Error(`unsupported platform: ${process.env.PLATFORM}`);
};

class Config {
  static getAppiumConfig() {
    return {
      // Local, absolute path or remote URL to an app.
      app: process.env.APP_URL,
      deviceName: process.env.DEVICE,
      appWaitForLaunch: true,
    };
  }
}

class AndroidConfig extends Config {
  static getAppiumConfig() {
    return {
      ...super.getAppiumConfig(),
      platformName: 'android',
      automationName: 'UiAutomator2',
      avd: super.getAppiumConfig().deviceName,
      appActivity: appConfig.expo.android.package + '.MainActivity',
    };
  }
}

class iOSConfig extends Config {
  static getAppiumConfig() {
    return {
      ...super.getAppiumConfig(),
      platformName: 'ios',
      automationName: 'XCUITest',
      udid: process.env.IPHONE_UUID,
      deviceName: 'iPhone 11',
      platformVersion: '15.2',
      bundleId: appConfig.expo.ios.bundleIdentifier,
    };
  }
}

export const config = getConfig(process.env.PLATFORM);
