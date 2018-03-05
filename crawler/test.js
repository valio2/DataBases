const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

// const someurl = 'http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?page=0&pageselect=100&q=:price-asc&text=&layout=List&sort=price-asc';
// const somewebsite = 'technopolis';
const someurl = 'https://smartphone.bg/smartphones-all?page=1';
const somewebsite = 'smartphone.bg';

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
    let lastPageNumber = $('.pagination')
        .children()
        .toArray();
    lastPageNumber = $(lastPageNumber[lastPageNumber.length - 2]).text();
        // .siblings(':prev')
        // .text();
    console.log(lastPageNumber);
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

const run = async () => {
    const allUrls = await getAllPageUrls(someurl, somewebsite);
    console.log(allUrls);
};
run();