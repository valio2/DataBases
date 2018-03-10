const {
    getProductsDetailsTechnopolis,
    getProductsDetailsSmartphone,
} = require('./getProductsDetails');

// const makeRequests = (Urls, website) => {
//     const dataArr = Urls.reduce(async (acc, data) => {
//         const accumolator = await acc;
//         const result = await Promise.all(data.map((url) => {
//             if (website === 'technopolis') {
//                 return getProductsDetailsTechnopolis(url, website);
//             }
//             return getProductsDetailsSmartphone(url, website);
//         }));
//         return Promise.resolve([...accumolator, ...result]);
//     }, Promise.resolve([]));

//     return dataArr;
// };

const makeRequests = async (arr, allPhones, website) => {
    if (arr.length === 0) {
        return allPhones;
    }
    const count = 30;
    const links = arr.splice(0, count);
    let phones;
    if (website === 'technopolis') {
        phones = await Promise.all(links
            .map((link) => getProductsDetailsTechnopolis(link, website)));
    } else {
        phones = await Promise.all(links
            .map((link) => getProductsDetailsSmartphone(link, website)));
    }
    allPhones.push(phones);

    await makeRequests(arr, allPhones, website);
    return allPhones;
};

// const makeRequests = (urls) => {
//     const dataArr = urls.map(async (data) => {
//         const result = await Promise.all(data.map((url) => {
//             return getProductsDetailsTechnopolis(url);
//         }));
//         return result;
//     });

//     return dataArr;
// };

module.exports = {
    makeRequests,
};