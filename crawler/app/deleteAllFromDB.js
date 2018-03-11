const {
    Phone,
    Characteristics,
} = require('../crawlerDB/models');

const deletAllFromDB = async () => {
    Phone.destroy({
        where: {},
    });
    Characteristics.destroy({
        where: {},
    });
};

module.exports = {
    deletAllFromDB,
};