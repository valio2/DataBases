const {
    getAllPageUrls,
} = require('./getAllPages');

const {
    getTechnopolisPhonesLinks,
} = require('./getProductLinks');

const run = async () => {
    const allPageUrls = await getAllPageUrls();
    let productLinks = await Promise.all(allPageUrls.map((page) => {
        return getTechnopolisPhonesLinks(page);
    }));
    productLinks = [].concat(...productLinks);
    console.log(productLinks);
};
run();