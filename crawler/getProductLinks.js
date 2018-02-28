const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getProductsLinks = async (url) => {
    const baseLink = 'http://www.technopolis.bg';
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.products-list .product-box .box');

    return [...$(productLinksSelector)]
        .map((link) => $(link)
            .children(':first')
            .children(':first')
            .attr('href'))
        .map(($link) => baseLink + $link);
};

const getTechnopolisPhonesLinks = async (link) => {
    return await getProductsLinks(link);
};
// getTechnopolisPhonesLinks();

module.exports = {
    getTechnopolisPhonesLinks,
};