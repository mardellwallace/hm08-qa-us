module.exports = {
    // Inputs
    fromField: "#from",
    toField: "#to",
    phoneNumberField: "#phone",
    codeField: "#code",
    commentField: "#comment",
    cardNumberField: "#number", // Selector for card number input
    cardCodeField: "#code", // Selector for card code input
    linkButton: "button=Link", // Selector for link button
  
    // Modals
    carSearchModal: ".car-search-modal", // Updated selector for car search modal
    driverInfoModal: ".driver-info-modal", // Ensure this selector matches your HTML structure
    phoneNumberModal: ".modal", // Selector for phone number modal
    driverInfoModal: 'div*=The driver will arrive',
    paymentPicker: ".payment-picker.open", // Selector for payment modal,
  
    // Overlay
    overlay: ".overlay",
  
    // Buttons
    callATaxiButton: "button=Call a taxi",
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: "button=Next",
    confirmButton: "button=Confirm",
    placeOrderButton: ".smart-button-main=Order", // Added selector for the place order button
  
    // Functions
    waitForOverlayToDisappear: async function () {
      const overlay = await $(this.overlay);
      await overlay.waitForDisplayed({ reverse: true, timeout: 15000 });
    },
  
    fillAddresses: async function (from, to) {
      const fromField = await $(this.fromField);
      await fromField.setValue(from);
      const toField = await $(this.toField);
      await toField.setValue(to);
      const callATaxiButton = await $(this.callATaxiButton);
      await callATaxiButton.waitForDisplayed();
      await callATaxiButton.click();
    },
  
    fillPhoneNumber: async function (phoneNumber) {
      const phoneNumberButton = await $(this.phoneNumberButton);
      await phoneNumberButton.waitForDisplayed();
      await phoneNumberButton.click();
      const phoneNumberModal = await $(this.phoneNumberModal);
      await phoneNumberModal.waitForDisplayed();
      const phoneNumberField = await $(this.phoneNumberField);
      await phoneNumberField.waitForDisplayed();
      await phoneNumberField.setValue(phoneNumber);
    },
  
    submitPhoneNumber: async function (phoneNumber) {
      await this.fillPhoneNumber(phoneNumber);
      await browser.setupInterceptor();
      await $(this.nextButton).click();
      await browser.pause(2000);
      const codeField = await $(this.codeField);
      const requests = await browser.getRequests();
      await expect(requests.length).toBe(1);
      const code = await requests[0].response.body.code;
      await codeField.setValue(code);
      await $(this.confirmButton).click();
    },
  
    writeDriverMessage: async function (message) {
      const messageField = await $(this.commentField);
      await messageField.waitForDisplayed();
      await messageField.setValue(message);
    },
  
    selectSupportivePlan: async function () {
      await this.waitForOverlayToDisappear();
      const supportivePlan = await $("div=Supportive");
      await supportivePlan.waitForDisplayed();
      await supportivePlan.click();
    },
  
    selectVehicleType: async function (planName) {
      await this.waitForOverlayToDisappear();
      const vehicleType = await $(`div=${planName}`); // Dynamically select vehicle type
      await vehicleType.waitForDisplayed();
      await vehicleType.click();
    },
  
    orderBlanketAndHandkerchiefs: async function () {
      const blanketSwitchLabel = await $("div.r-sw-label=Blanket and handkerchiefs");
      const blanketSwitchInput = await $(".switch");
      await this.waitForOverlayToDisappear();
      await blanketSwitchInput.scrollIntoView();
      await blanketSwitchInput.waitForClickable({ timeout: 10000 });
  
      const isChecked = await blanketSwitchInput.isSelected();
      if (!isChecked) {
        await blanketSwitchInput.click();
      }
    },
  
    orderIceCreams: async function (quantity) {
      const counterValueElement = await $("div.counter-value");
      await counterValueElement.waitForDisplayed();
      const currentValueText = await counterValueElement.getText();
      const currentValue = parseInt(currentValueText, 10); // Ensure conversion to a number
  
      if (isNaN(currentValue)) {
        throw new Error("Failed to retrieve current ice cream count.");
      }
  
      if (currentValue < quantity) {
        const incrementButton = await $("div.counter-plus");
        await incrementButton.waitForDisplayed();
  
        for (let i = currentValue; i < quantity; i++) {
          await incrementButton.click();
          await browser.pause(100);
        }
      }
  
      // Assertion to verify the final count
      const finalValueText = await counterValueElement.getText();
      const finalValue = parseInt(finalValueText, 10);
      expect(finalValue).toBe(quantity);
    },
  
    selectPaymentMethod: async function () {
      const paymentMethodButton = await $(".pp-button.filled");
      await paymentMethodButton.waitForDisplayed({ timeout: 15000 });
      if (await paymentMethodButton.isClickable()) {
        await paymentMethodButton.click();
      } else {
        console.log("Payment method button is not clickable.");
      }
      const paymentPicker = await $(this.paymentPicker);
      await paymentPicker.waitForDisplayed({ timeout: 15000 });
    },
  
    verifyCarSearchModal: async function () {
      const carSearchModal = await $(this.carSearchModal);
      await carSearchModal.waitForDisplayed({ timeout: 45000 });
    },
  
    waitForCarSearchModal: async function () {
      const carSearchModal = await $(this.carSearchModal);
      await carSearchModal.waitForDisplayed({ timeout: 45000 });
    },
  
    waitForDriverInfo: async function () {
      const driverInfoModal = await $(this.driverInfoModal);
      await driverInfoModal.waitForDisplayed({ timeout: 45000 });
    },
  
    clickPlaceOrderButton: async function () {
      const orderButton = await $(this.placeOrderButton);
      await orderButton.waitForDisplayed();
      await orderButton.click();
    },
  
    // Additional methods as needed for the new functionality...
    waitForDriverAssignmentCountdown: async function (timeout = 45000) {
      // Implement countdown wait logic if necessary
      await browser.pause(timeout); // Placeholder for actual countdown handling
    },
  
    verifyDriverInfoModalTitle: async function (expectedTitle) {
      const driverInfoModalTitle = await this.driverInfoModal.$(".driver-info-modal-title"); // Adjust as needed
      await driverInfoModalTitle.waitForDisplayed();
      const titleText = await driverInfoModalTitle.getText();
      return titleText === expectedTitle;
    },
  };
  