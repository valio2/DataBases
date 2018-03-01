const {
    getAllPageUrls,
} = require('./getAllPages');

const {
    getTechnopolisPhonesLinks,
} = require('./getProductLinks');

const {
    makeRequests,
} = require('./makeRequests');

let allPhones = [];
const run = async () => {
    const allPageUrls = await getAllPageUrls();
    let productLinks = await Promise.all(allPageUrls.map((page) => {
        return getTechnopolisPhonesLinks(page);
    }));
    productLinks = [].concat(...productLinks);

    await makeRequests(productLinks, allPhones);
    allPhones = [].concat(...allPhones);
    // console.log(allPhones.length);
};
run();