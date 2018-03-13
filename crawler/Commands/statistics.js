const {
    Phone,
    Characteristics,
} = require('../crawlerDB/models');

const Op = require('../crawlerDB/node_modules/sequelize/lib/operators');

const {
    buildPhoneCharacteristics,
} = require('./buildPhoneCharacteristics');

const {
    findPhonesWithCharacteristics,
} = require('./findPhonesWithCharacteristics');

const command = process.argv[2].split(':');

require('console.table');

const run = async () => {
    if (command[0] === 'order-by-price') {
        let phones = await Phone.findAll();

        phones = await Promise.all(phones
            .sort((a, b) => a.Price - b.Price)
            .map(async (phone) => buildPhoneCharacteristics(phone)));
        // phones.forEach((phone) => console.log(phone));
        console.table(phones);
    } else if (command[0] === 'search') {
        let chars;
        if (command[1] === 'has') {
            chars = await Characteristics.findAll()
                .filter((char) => char.name.toLowerCase()
                    .indexOf(command[2].toLowerCase()) >= 0)
                .filter((char) => char.value.indexOf('да') >= 0)
                .map((char) => char.id);
        } else {
            chars = await Characteristics.findAll()
                .filter((char) => char.value.toLowerCase()
                    .indexOf(command[1].toLowerCase()) >= 0)
                .map((char) => char.id);
        }
        findPhonesWithCharacteristics(chars);
    } else if (command[0] === 'filter') {
        if (command[1].toLowerCase() === 'price') {
            if (command[2].toLowerCase() === 'gt') {
                let phones = await Phone.findAll({
                    where: {
                        Price: {
                            [Op.gte]: Number(command[3]),
                        },
                    },
                });
                phones = await Promise.all(phones
                    .sort((a, b) => a.Price - b.Price)
                    .map(async (phone) => buildPhoneCharacteristics(phone)));

                // phones.forEach((phone) => console.log(phone));
                console.table(phones);
            } else if (command[2].toLowerCase() === 'lt') {
                let phones = await Phone.findAll({
                    where: {
                        Price: {
                            [Op.lte]: Number(command[3]),
                        },
                    },
                });
                phones = await Promise.all(phones
                    .sort((a, b) => a.Price - b.Price)
                    .map(async (phone) => buildPhoneCharacteristics(phone)));

                // phones.forEach((phone) => console.log(phone));
                console.table(phones);
            }
        } else {
            let chars = await Characteristics.findAll({
                where: {
                    name: command[1],
                },
            });
            if (command[2].toLowerCase() === 'gt') {
                chars = chars.map((char) => {
                    let value = char.value;
                    if (command[1].toLowerCase().indexOf('ram') >= 0) {
                        if (command[3].toLowerCase().indexOf('mb') >= 0) {
                            if (value.indexOf('gb') >= 0) {
                                return char.id;
                            }
                        } else {
                            if (value.indexOf('mb') >= 0 || value === 'не') {
                                return null;
                            }
                        }
                    }
                    value = value.match(/\d+/);
                    const compare = Number(command[3].match(/\d+/)[0]);
                    if (value !== null) {
                        if (value >= compare) {
                            return char.id;
                        }
                    }
                    return null;
                });
            } else if (command[2].toLowerCase() === 'lt') {
                chars = chars.map((char) => {
                    let value = char.value;
                    if (command[1].toLowerCase().indexOf('ram') >= 0) {
                        if (command[3].toLowerCase().indexOf('gb') >= 0) {
                            if (value.indexOf('mb') >= 0 ||
                                value.indexOf('не') >= 0) {
                                return char.id;
                            }
                        } else {
                            if (value.indexOf('gb') >= 0) {
                                return null;
                            }
                        }
                    }
                    value = value.match(/\d+/);
                    const compare = Number(command[3].match(/\d+/)[0]);
                    if (value !== null) {
                        if (value < compare) {
                            return char.id;
                        }
                    }
                    return null;
                });
            }
            chars = chars
                .filter((char) => char !== null);
            findPhonesWithCharacteristics(chars);
        }
    }
};
run();