const {
    getProductsDetails,
} = require('./getProductsDetails');

const makeRequests = async (arr, allPhones) => {
    if (arr.length === 0) {
        return;
    }
    const count = 20;
    const links = await arr.splice(0, count);
    const phones = await Promise.all(links
        .map((link) => getProductsDetails(link)));
    allPhones.push(phones);
    // console.log(allPhones.length);
    // console.log(arr.length);


    await makeRequests(arr, allPhones);
};

module.exports = {
    makeRequests,
};