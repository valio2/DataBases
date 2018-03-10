const {
    Brand,
    Phone,
    Website,
    Characteristics,
} = require('../crawlerDB/models');

const nonCharacteristics = ['model', 'Dimensions',
    'Price', 'WebsiteId', 'BrandId',
];

const insertPhoneToDB = async (phone, insertedPhonesCounter) => {
    let websiteId = await Website.findCreateFind({
        where: {
            name: phone.WebsiteId,
        },
    });
    websiteId = websiteId[0].dataValues.id;

    let brandId = await Brand.findCreateFind({
        where: {
            name: phone.BrandId,
        },
    });
    brandId = brandId[0].dataValues.id;

    phone.WebsiteId = websiteId;
    phone.BrandId = brandId;


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