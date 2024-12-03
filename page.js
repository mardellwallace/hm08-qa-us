module.exports = {
    // Inputs
    fromField: "#from",
    toField: "#to",
    phoneNumberField: "#phone",
    codeField: "#code",
    commentField: "#comment",
    cardNumberField: "#number",
    cardCodeField: '.card-second-row #code', 
    cardCVVField: '#code',
    linkButton: "button=Link", 
  
    // Modals
    carSearchModal: ".car-search-modal",
    driverInfoModal: ".driver-info-modal",
    phoneNumberModal: ".modal",
    driverInfoModal: 'div*=The driver will arrive',
    paymentPicker: ".payment-picker.open",
    cardModal: "#add-card-modal",
  
    // Overlay
    overlay: ".overlay",
  
    // Buttons
    callATaxiButton: "button=Call a taxi",
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    supportiveButton: 'div=Supportive',
    nextButton: "button=Next",
    confirmButton: "button=Confirm",
    placeOrderButton: ".smart-button-main=Order",
    addCardButton: 'div.pp-title=Add card',
    cardModalCloseButton: '.payment-picker .section.active .close-button',
    addedCard: 'div=Card',
    linkCardButton: 'button=Link',
    planButtonActive: 'div=Supportive',
    paymentMethod: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]',
    blanketAndHandkerchiefs: '.switch-input',
    iceCreamCounterPlusButton: '.counter-plus',
    orderButton: 'button=order',
    blanketSwitchSelector: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]/div/span',
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
      const vehicleType = await $(`div=${planName}`);
      await vehicleType.waitForDisplayed();
      await vehicleType.click();
    },
  
    orderBlanketAndHandkerchiefs: async function () {
      const blanketSwitchLabel = await $(
        "div.r-sw-label=Blanket and handkerchiefs"
      );
      const blanketSwitchInput = await $('.switch');
  
      // Wait for the overlay to disappear
      await this.waitForOverlayToDisappear();
  
      // Ensure the element is in view before clicking
      await blanketSwitchInput.scrollIntoView();
      await blanketSwitchInput.waitForClickable({ timeout: 10000 }); // Wait for the element to be clickable
  
      const isChecked = await blanketSwitchInput.isSelected();
      if (!isChecked) {
        await blanketSwitchInput.click(); // Click to enable the switch
      }
    },
  
    orderIceCreams: async function (quantity) {
      const counterValueElement = await $("div.counter-value");
      await counterValueElement.waitForDisplayed();
      const currentValueText = await counterValueElement.getText();
      const currentValue = parseInt(currentValueText, 10);
  
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
  
      const finalValueText = await counterValueElement.getText();
      const finalValue = parseInt(finalValueText, 10);
      expect(finalValue).toBe(quantity);
    },
  
    addCreditCard: async function (cardNumber, cvv) {
      const cardModal = await $(this.cardModal);
      await cardModal.waitForDisplayed({ timeout: 15000 });
      const cardNumberField = await $(this.cardNumberField);
      const cardCVVField = await $(this.cardCVVField);
      await cardNumberField.waitForDisplayed({ timeout: 15000 });
      await cardNumberField.setValue(cardNumber);
      await cardCVVField.setValue(cvv);
      await cardCVVField.keys("Tab");
      await $(this.addCardButton).waitForEnabled();
      await $(this.addCardButton).click();
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
  
    waitForDriverAssignmentCountdown: async function (timeout = 45000) {
      await browser.pause(timeout);
    },
  
    verifyDriverInfoModalTitle: async function (expectedTitle) {
      const driverInfoModal = await $(this.driverInfoModal);
      const driverInfoModalTitle = await driverInfoModal.$(".driver-info-modal-title");
      await driverInfoModalTitle.waitForDisplayed();
      const titleText = await driverInfoModalTitle.getText();
      return titleText === expectedTitle;
    },
  };
  