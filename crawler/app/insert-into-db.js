const {
    Phone,
    Characteristics,
} = require('../crawlerDB/models');

const nonCharacteristics = [
    'model', 'Dimensions', 'Price',
];

const insertPhoneToDB = async (phone, insertedPhonesCounter) => {
    const keys = Object.keys(phone);
    let charIds = await Promise.all(keys.map(async (key) => {
        if (nonCharacteristics.indexOf(key) < 0) {
            const charId = await Characteristics.findCreateFind({
                where: {
                    name: key,
                    value: phone[key],
                },
            });
            return charId[0].dataValues.id;
        }
        return null;
    }));
    charIds = charIds.filter((ele) => ele !== null);

    const phoneInDB = await Phone.create(phone);
    await phoneInDB.setCharacteristics(charIds);

    console.log('Phone added ' + '(' + phoneInDB.id + ')');
};

module.exports = {
    insertPhoneToDB,
};