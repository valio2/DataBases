const {
    getAllPageUrls,
} = require('./getAllPages');

const {
    getPhonesLinks,
} = require('./getProductLinks');

const {
    makeRequests,
} = require('./makeRequests');

const {
    insertPhoneToDB,
} = require('./insert-into-db');

const {
    deletAllFromDB,
} = require('./deleteAllFromDB');

const technopolisUrl = 'http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?page=0&pageselect=100&q=:price-asc&text=&layout=List&sort=price-asc';
const technopolisWebsite = 'technopolis';
const smartphoneUrl = 'https://smartphone.bg/smartphones-all?page=1';
const smartphoneWebsite = 'smartphone.bg';
const run = async (startUrl, website) => {
    deletAllFromDB();

    const allPageUrls = await getAllPageUrls(startUrl, website);

    let productLinks = await Promise.all(allPageUrls.map((page) => {
        return getPhonesLinks(page, website);
    }));

    // const allPhones = await makeRequests(productLinks, website);

    productLinks = [].concat(...productLinks);
    let allPhones = await makeRequests(productLinks, [], website);
    allPhones = [].concat(...allPhones).filter((ele) => ele !== null);
    console.log(allPhones.length);

    // allPhones.forEach(async (phone) => await insertPhoneToDB(phone));
    const myTimer = setInterval(() => {
        insertPhoneToDB(allPhones.shift());
        if (allPhones.length === 0) {
            clearInterval(myTimer);
        }
    }, 100);
};
run(technopolisUrl, technopolisWebsite);
run(smartphoneUrl, smartphoneWebsite);