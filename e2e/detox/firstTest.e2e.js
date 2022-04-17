describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show hello screen on launch', async () => {
    await expect(element(by.text('Hello world!'))).toBeVisible();
  });
});
