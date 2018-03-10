const {
    Brand,
    Phone,
    Website,
    Characteristics,
    phonesCharacteristics,
} = require('./crawlerDB/models');

const run = async () => {
    let chars = await phonesCharacteristics.findAll({
        where: {
            PhoneId: 3,
        },
    });
    chars = chars.map((char) => char.CharacteristicId);
    console.log(chars);
};
run();