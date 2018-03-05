const {
    getProductsDetailsTechnopolis,
    getProductsDetailsSmartphone,
} = require('./getProductsDetails');

const makeRequests = (Urls, website) => {
    const dataArr = Urls.reduce(async (acc, data) => {
        const accumolator = await acc;
        const result = await Promise.all(data.map((url) => {
            if (website === 'technopolis') {
                return getProductsDetailsTechnopolis(url);
            }
            return getProductsDetailsSmartphone(url);
        }));
        return Promise.resolve([...accumolator, ...result]);
    }, Promise.resolve([]));

    return dataArr;
};

// const makeRequests = async (arr, allPhones, website) => {
//     if (arr.length === 0) {
//         return;
//     }
//     const count = 30;
//     const links = arr.splice(0, count);
//     let phones;
//     if (website === 'technopolis') {
//         phones = await Promise.all(links
//             .map((link) => getProductsDetailsTechnopolis(link)));
//     } else {
//         // crawl smartphones.bg
//     }
//     allPhones.push(phones);

//     // console.log(allPhones);
//     // console.log(allPhones.length);
//     // console.log(arr.length);
//     await makeRequests(arr, allPhones, website);
// };

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