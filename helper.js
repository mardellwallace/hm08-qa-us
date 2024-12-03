module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
     getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
    getCreditCardNumber: function() {
        const cardNumber = Math.floor(Math.random() * 10000000000000000);
        return cardNumber;
    },
    getCVVcode: function() {
        const cvvCode = Math.floor(Math.random() * 100);
        return cvvCode;
    
    },
};