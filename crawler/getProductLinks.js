const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getProductsLinksTechnopolis = async (url) => {
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

const getProductsLinksSmartphones = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.products li article div:not([class]) a');

    return [...$(productLinksSelector)]
        .map((link) => $(link).attr('href'))
        .filter((link) => link.indexOf('smartphone.bg') >= 0);
};

const getPhonesLinks = async (link, website) => {
    if (website === 'technopolis') {
        return await getProductsLinksTechnopolis(link);
    }
    return getProductsLinksSmartphones(link);
};
// getPhonesLinks();

module.exports = {
    getPhonesLinks,
};