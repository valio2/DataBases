const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const startUrl = 'http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?page=0&pageselect=100&q=:price-asc&text=&layout=List&sort=price-asc';

const getNumberOfPages = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const lastPageUrl = $('.paging li.last')
        .children(':last')
        .attr('href')
        .match(/page=\d*/)[0]
        .match(/\d+/)[0];

    if (lastPageUrl) {
        return Number(lastPageUrl) + 1;
    }
    // const pageLinksSelector = '.paging a';
    // return [...$(pageLinksSelector)].map((link) => $(link))
    //     .map(($link) => baseUrl + $link.attr('href'));
};


const getAllPageUrls = async () => {
    const numberOfPages = await getNumberOfPages(startUrl);

    const allUrls = Array.from({
        length: numberOfPages,
    });
    allUrls.forEach((_, index) => {
        allUrls[index] = startUrl.replace(/page=\d*/, 'page=' + index);
    });
    return allUrls;
};

module.exports = {
    getAllPageUrls,
};