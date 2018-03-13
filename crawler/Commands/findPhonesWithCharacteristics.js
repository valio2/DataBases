const {
    Phone,
    phonesCharacteristics,
} = require('../crawlerDB/models');

const {
    buildPhoneCharacteristics,
} = require('./buildPhoneCharacteristics');

const findPhonesWithCharacteristics = async (chars) => {
    const phoneIds = await phonesCharacteristics.findAll({
        where: {
            CharacteristicId: chars,
        },
    }).map((id) => id.PhoneId);

    const phonesInDb = await Promise.all(phoneIds
        .map(async (phone) => {
            return await Phone.find({
                where: {
                    id: phone,
                },
            });
        }));

    const phones = await Promise.all(phonesInDb
        .map(async (phone) => await buildPhoneCharacteristics(phone)));
    console.table(phones);
    // phones.forEach((phone) => console.log((phone)));
};

module.exports = {
    findPhonesWithCharacteristics,
};