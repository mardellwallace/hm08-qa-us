const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        expect(phoneNumberModal).toBeExisting();
    })

    it('should save the address', async ()=> {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect(await $(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect(await $(page.toField)).toHaveValue('1300 1st St');
    })

    it('should select supportive', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveButton = await page.selectSupportive();
        await expect(supportiveButton.parentElement()).toHaveElementClass('active');
    })

    it('should add a credit card', async () => {
        await browser.url('/');
    
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addCreditCard()

        await expect($(page.paymentMethodAddedCard)).toBeExisting();
    })    

    it('should send a message to the driver', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addMessageToTheDriver('Pick me up quickly');
        await expect($(page.messageButton)).toHaveValue('Pick me up quickly');
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        await page.clickBlanketsAndHandkerchiefs();
        await expect($(page.blanketAndHanderchiefsStatus)).ToBeChecked;
    })

    it('should order 2 ice creams', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const iceCreamQty = 2;
        await page.addIceCream(iceCreamQty);
        await expect($(`div=${iceCreamQty}`)).toBeExisting();
    })
    
    it('should show the car search modal', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        let countryCode = '+1';
        let phoneNumber = await helper.getPhoneNumber(countryCode);
        await page.submitPhoneNumber(phoneNumber);
        const actualMessage = 'Test message.';
        await page.addMessageToTheDriver(actualMessage);
        const orderCarButton = await $(page.orderButton);
        await orderCarButton.waitForDisplayed();
        await orderCarButton.click();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();
    })


});
