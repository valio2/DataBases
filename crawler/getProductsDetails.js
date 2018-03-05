const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getProductsDetailsTechnopolis = async (url) => {
    const obj = {};
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.table-characteristics tbody tr');

    [...$(productLinksSelector)].map((row) => {
        const children = $(row).children().toArray()
            .map((x) => $(x).text());
        const key = children[0];
        const value = children[1]
            .replace('\n\t\t\t\t\t\t\t\t\t', '');
        obj[key] = value;
    });
    return obj;
};

const getProductsDetailsSmartphone = async (url) => {
    const obj = {};
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.product-characteristics tbody tr');

    const brand = $('header>h1').text().split(' ')[0].trim();
    obj.brand = brand;

    [...$(productLinksSelector)].map((row) => {
        const children = $(row).children().toArray()
            .map((x) => $(x).text());

        const key = children[0]
            .replace(/\n|\t/g, '');
        const value = children[1]
            .replace(/\n|\t/g, '');
        obj[key] = value;
    });
    return obj;
};

module.exports = {
    getProductsDetailsTechnopolis,
    getProductsDetailsSmartphone,
};