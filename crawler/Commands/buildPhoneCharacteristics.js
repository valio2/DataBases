const {
    Characteristics,
    phonesCharacteristics,
} = require('../crawlerDB/models');

const buildPhoneCharacteristics = async (phone) => {
    const obj = {
        model: phone.Model,
        Price: phone.Price,
    };

    const phoneChars = await phonesCharacteristics.findAll({
        where: {
            PhoneId: phone.id,
        },
    }).map((char) => char.CharacteristicId);
    // phoneChars = phoneChars
    //     .map((char) => char.CharacteristicId);

    await Promise.all(phoneChars.map(async (charId) => {
        const characteristic = await Characteristics.find({
            where: {
                id: charId,
            },
        });
        obj[characteristic.name] = characteristic.value;
    }));
    obj.Dimensions = phone.Dimensions;
    return obj;
};

module.exports = {
    buildPhoneCharacteristics,
};