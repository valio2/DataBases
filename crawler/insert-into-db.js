const {
    Brand,
    OS,
    Phone,
    Website,
    ram,
} = require('./crawlerDB/models');

const insertPhoneToDB = async (phone) => {
    let websiteId = await Website.findCreateFind({
        where: {
            name: phone.WebsiteId,
        },
    });
    websiteId = websiteId[0].dataValues.id;

    let OsId = await OS.findCreateFind({
        where: {
            name: phone.OId,
        },
    });
    OsId = OsId[0].dataValues.id;

    let brandId = await Brand.findCreateFind({
        where: {
            name: phone.BrandId,
        },
    });
    brandId = brandId[0].dataValues.id;

    let ramId = await ram.findCreateFind({
        where: {
            name: phone.RamId,
        },
    });
    ramId = ramId[0].dataValues.id;

    phone.WebsiteId = websiteId;
    phone.BrandId = brandId;
    phone.OId = OsId;
    phone.ramId = ramId;

    await Phone.create(phone);
    console.log('Phone added');
};

module.exports = {
    insertPhoneToDB,
};