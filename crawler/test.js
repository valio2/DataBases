// const {
//     Brand,
//     OS,
//     Phone,
//     Website,
//     ram,
//     Price,
// } = require('./crawlerDB/models');
// const $ = require('jquery');


// const command = process.argv[2].split(':');
// console.log(command);

// if (command[0] === 'order-by-price') {
//     $.ajax({

//     });
// }
const obj = {
    WebsiteId: 'technopolis',
    Price: '49.00',
    BrandId: 'NOKIA',
    model: '10005 DUAL SIM BLACK',
    Dimensions: '112x49.5x14.4mm',
    cpu: 'ДА',
    OId: 'НЕ',
    '4G': 'ДАААА',
    RamId: 'НЕ',
    Dual_sim: 'ДА',
    Weight: '73g',
    Battery: 'Li-Ion 800 mAh',
    Warranty: '12 МЕСЕЦА',
};
const nonCharacteristics = ['model', 'Dimensions',
    'Price', 'WebsiteId', 'BrandId',
];

const {
    Brand,
    Phone,
    Website,
    Characteristics,
} = require('./crawlerDB/models');

const insertPhoneToDB = async (phone) => {
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
            if (charId[0]._options.isNewRecord) {
                return charId[0].dataValues.id;
            }
            return null;
        }
        return null;
    }));
    charIds = charIds.filter((ele) => ele !== null);
    const phoneInDB = await Phone.create(phone);
    await phoneInDB.setCharacteristics(charIds);

    console.log('Phone added');
};
insertPhoneToDB(obj);