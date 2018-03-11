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
    } else if (command[0] === 'search') {
        let chars;
        if (command[1] === 'has') {
            chars = await Characteristics.findAll()
                .filter((char) => char.name.indexOf(command[2]) >= 0)
                .filter((char) => char.value.indexOf('да') >= 0)
                .map((char) => char.id);
        } else {
            chars = await Characteristics.findAll()
                .filter((char) => char.value.indexOf(command[1]) >= 0)
                .map((char) => char.id);
        }


        let phoneIds = await Promise.all(chars.map(async (char) => {
            return await phonesCharacteristics.findAll({
                    where: {
                        CharacteristicId: chars,
                    },
                })
                .map((id) => id.PhoneId);
        }));
        phoneIds = [].concat(...phoneIds);

        let phones = await Promise.all(phoneIds
            .map(async (phone) => {
                return await Phone.find({
                    where: {
                        id: phone,
                    },
                });
            }));
        phones = await Promise.all(phones
            .map(async (phone) => await buildPhoneCharacteristics(phone)));
        phones.forEach((phone) => console.log(phone));
    }
};
run();