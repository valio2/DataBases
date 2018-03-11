const {
    Phone,
    Characteristics,
    phonesCharacteristics,
} = require('./crawlerDB/models');
const {
    buildPhoneCharacteristics,
} = require('./Commands/buildPhoneCharacteristics');
const command = process.argv[2].split(':');
// console.log(command);
const run = async () => {
    const chars = await Characteristics.findAll()
        .filter((char) => char.name.indexOf(command[1]) >= 0)
        .filter((char) => char.value.indexOf('да') >= 0)
        .map((char) => char.id);
        console.log(chars);
};
run();