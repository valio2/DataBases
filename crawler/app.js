const {
    getAllPageUrls,
} = require('./getAllPages');

const {
    getPhonesLinks,
} = require('./getProductLinks');

const {
    makeRequests,
} = require('./makeRequests');

const startUrl = 'http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?page=0&pageselect=100&q=:price-asc&text=&layout=List&sort=price-asc';
const website = 'technopolis';
// const startUrl = 'https://smartphone.bg/smartphones-all?page=1';
// const website = 'smartphone.bg';

// let allPhones = [];
const run = async () => {
    const allPageUrls = await getAllPageUrls(startUrl, website);
    // console.log(allPageUrls);
    const productLinks = await Promise.all(allPageUrls.map((page) => {
        return getPhonesLinks(page, website);
    }));
    // console.log(productLinks.length);
    const result = await makeRequests(productLinks.slice(0, 1), website);
    console.log(result);

    // productLinks = [].concat(...productLinks);
    // await makeRequests(productLinks, allPhones, website);
    // allPhones = [].concat(...allPhones);
    // console.log(allPhones.length);
};
run();