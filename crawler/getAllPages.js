const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getNumberOfPages = async (url, website) => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);

    if (website === 'technopolis') {
        const lastPageUrl = $('.paging li.last');

        if (lastPageUrl) {
            const numberOfPages = lastPageUrl
                .children(':last')
                .attr('href')
                .match(/page=\d*/)[0]
                .match(/\d+/)[0];
            return Number(numberOfPages) + 1;
        }
        return null;
    }
    const lastPageNumber = $('.pagination')
        .children(':last')
        .siblings(':prev')
        .text();
    return lastPageNumber;
};


const getAllPageUrls = async (startUrl, website) => {
    const numberOfPages = await getNumberOfPages(startUrl, website);

    const allUrls = Array.from({
        length: numberOfPages,
    });
    allUrls.forEach((_, index) => {
        if (website === 'technopolis') {
            allUrls[index] = startUrl.replace(/page=\d*/, 'page=' + index);
        } else {
            allUrls[index] = startUrl
                .replace(/page=\d*/, 'page=' + Number(index + 1));
        }
    });
    return allUrls;
};

module.exports = {
    getAllPageUrls,
};