const {
    Brand,
    Characteristicss,
    Phone,
    Website,
} = require('./crawlerDB/models');
const $ = require('jquery');


const command = process.argv[2].split(':');
console.log(command);

if (command[0] === 'order-by-price') {
    $.ajax({

    });
}
