const {
    Brand,
    Website,
    Characteristics,
    phonesCharacteristics,
} = require('../crawlerDB/models');

const buildPhoneCharacteristics = async (phone) => {
    const obj = {
        model: phone.model,
        Price: phone.Price,
    };

    const brand = await Brand.find({
        where: {
            id: phone.BrandId,
        },
    });
    obj.Brand = brand.name;

    const website = await Website.find({
        where: {
            id: phone.WebsiteId,
        },
    });
    obj.Website = website.name;

    let phoneChars = await phonesCharacteristics.findAll({
        where: {
            PhoneId: phone.id,
        },
    });
    phoneChars = phoneChars
        .map((char) => char.CharacteristicId);

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