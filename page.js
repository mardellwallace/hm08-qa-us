module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    paymentMethodButton: '.pp-text',
    addCardButton: '.pp-plus-container',
    codeField: '#code',
    cardNumberField: '#number',
    cardCVVField: '.card-second-row #code',
    linkButton: 'button=Link',
    messageButton: '#comment',
    blanketAndHanderchiefsButton: '.switch',
    blanketAndHanderchiefsStatus: '.switch-input',
    addIceCreamButton: 'div=+',
    carSearchModal: 'div=Car search',
    orderButton: '.smart-button-main=Order',


    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportiveButton: 'div=Supportive',
    paymentMethodAddedCard: 'div=Card',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    selectSupportive: async function(phoneNumber) {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        return supportiveButton;
    },

    addCreditCard: async function(from, to) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
    
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(1234567891234);

        const cvvField = await $(this.cardCVVField);
        await cvvField.waitForDisplayed();
        await cvvField.setValue(12);
        await browser.keys("Tab");

        const linkCardButton = await $(this.linkButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();
    },

    addMessageToTheDriver: async function (message) {
        const messageButton = await $(this.messageButton);
        await messageButton.waitForDisplayed();
        messageButton.setValue(message);
    },

    clickBlanketsAndHandkerchiefs: async function() {
        const blanketAndHanderchiefsButton = await $(this.blanketAndHanderchiefsButton);
        await blanketAndHanderchiefsButton.waitForClickable();
        await blanketAndHanderchiefsButton.click();
    },

    addIceCream: async function() {
        const addIceCreamButton = await $(this.addIceCreamButton);
        await addIceCreamButton.waitForClickable();
        await addIceCreamButton.click();
        await addIceCreamButton.click();
    },

    orderCar: async function() {
        const orderCarButton = await $(this.orderCarButton);
        await orderCarButton.waitForClickable();
        await orderCarButton.click();
    },

    showCarSearchModal: async function() {
        const ppCloseButton = await $(this.ppCloseButton);
        const orderButton = await $(this.orderButton);
        const carSearchModal = await $(this.carSearchModal);

    },

};