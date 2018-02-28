const {
    getAllPageUrls,
} = require('./getAllPages');

const run = async () => {
    const allPageUrls = await getAllPageUrls();
    console.log(allPageUrls);
};
run();