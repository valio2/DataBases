const {
    Brand,
    Phone,
    Website,
    Characteristics,
} = require('../crawlerDB/models');

const deletAllFromDB = async () => {
    Brand.destroy({
        where: {},
    });
    Phone.destroy({
        where: {},
    });
    Website.destroy({
        where: {},
    });
    Characteristics.destroy({
        where: {},
    });
};

module.exports = {
    deletAllFromDB,
};