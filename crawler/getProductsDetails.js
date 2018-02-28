const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getProductsDetails = async (url) => {
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
    // console.log(obj);
};

module.exports = {
    getProductsDetails,
};