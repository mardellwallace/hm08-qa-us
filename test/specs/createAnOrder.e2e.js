const page = require("../../page");
const helper = require("../../helper");

describe("Create an order", () => {
  it("should open phone number modal", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumberButton = await $(page.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const phoneNumberModal = await $(page.phoneNumberModal);
    await expect(phoneNumberModal).toBeExisting();
  });

  it("should save the phone", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
  });

  it("should write a message for the driver", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const message = "Please pick me up quickly.";
    await page.writeDriverMessage(message);
    const messageField = await $(page.commentField);
    await expect(messageField).toHaveValue(message);
  });

  it("should select a supportive plan", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportivePlan();
  });

  it("should order blanket and handkerchiefs", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.orderBlanketAndHandkerchiefs();
  });

  it("should order 2 ice creams", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.orderIceCreams(2);
  });

  it("should select a payment method", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectPaymentMethod();
  });

  it("should display car search modal", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectVehicleType("Supportive");

    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    const message = "Please pick me up quickly.";
    await page.writeDriverMessage(message);
    await page.clickPlaceOrderButton();

    const carSearchModal = await $('div=Car search'); // Use the updated selector for the car search modal
    await carSearchModal.waitForDisplayed({ timeout: 45000 });
    await expect(carSearchModal).toHaveText("Car search");
  });

  it ("should wait for the driver info to appear in the modal", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");

    await page.selectVehicleType("Supportive");
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await page.writeDriverMessage("Please pick me up quickly.");
    await page.clickPlaceOrderButton();

   
    await browser.pause(30000);
    await expect($(`${page.driverInfoModal}`)).toBeExisting();
  })
});