const {
    Brand,
    Phone,
    Website,
    Characteristics,
    phonesCharacteristics,
} = require('../crawlerDB/models');

const {
    buildPhoneCharacteristics,
} = require('./buildPhoneCharacteristics');

const command = process.argv[2].split(':');

const run = async () => {
    if (command[0] === 'order-by-price') {
        let phones = await Phone.findAll();

        phones = await Promise.all(phones
            .sort((a, b) => a.Price - b.Price)
            .map(async (phone) => buildPhoneCharacteristics(phone)));

        phones.forEach((phone) => console.log(phone));
    }
};
run();