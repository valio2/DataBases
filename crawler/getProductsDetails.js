const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const getProductsDetailsTechnopolis = async (url, website) => {
    const obj = {
        website,
    };
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.table-characteristics tbody tr');

    [...$(productLinksSelector)].map((row) => {
        const children = $(row).children().toArray()
            .map((x) => $(x).text());
        const key = children[0];
        const value = children[1]
            .replace('\n\t\t\t\t\t\t\t\t\t', '');
        if (key === 'Марка') {
            obj.Brand = value;
        } else if (key === 'МОДЕЛ') {
            obj.Model = value;
        } else if (key === 'ПРОЦЕСОР') {
            obj.CPU = value;
        } else if (key === 'RAM ПАМЕТ') {
            obj.RAM = value;
        } else if (key === 'ОПЕРАЦИОННА СИСТЕМА') {
            obj.OS = value;
        } else if (key === 'DUAL SIM') {
            obj['DUAL SIM'] = value;
        } else if (key === 'ТЕГЛО') {
            obj.Weight = value;
        } else if (key === 'РАЗМЕР') {
            obj.Dimensions = value;
        } else if (key === 'ТИП БАТЕРИЯ') {
            obj.Battery = value;
        } else if (key === 'ГАРАНЦИЯ') {
            obj.Warranty = value;
        } else if (key === '4G') {
            obj['4G'] = value;
        } else if (key === 'СЛОТ ЗА КАРТА ПАМЕТ') {
            obj['SD slot'] = value;
        }
    });
    return obj;
};

const getProductsDetailsSmartphone = async (url, website) => {
    const obj = {
        website,
    };
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    const productLinksSelector = $('.product-characteristics tbody tr');

    const brand = $('header>h1').text().split(' ')[0].trim();
    obj.Brand = brand;

    [...$(productLinksSelector)].map((row) => {
        const children = $(row).children().toArray()
            .map((x) => $(x).text());

        const key = children[0]
            .replace(/\n|\t/g, '');
        const value = children[1]
            .replace(/\n|\t/g, '');
        if (key === 'Серия') {
            obj.Model = value;
        } else if (key === 'Процесор') {
            obj.CPU = value;
        } else if (key === 'Оперативна памет') {
            obj.RAM = value;
        } else if (key === 'Операционна система') {
            obj.OS = value;
        } else if (key === '2 сим карти') {
            obj['DUAL SIM'] = value;
        } else if (key === 'Тегло') {
            obj.Weight = value;
        } else if (key === 'Размери (Ш/В/Д)') {
            obj.Dimensions = value;
        } else if (key === 'Батерия') {
            obj.Battery = value;
        } else if (key === 'Гаранция') {
            obj.Warranty = value;
        } else if (key === '4G (LTE)') {
            obj['4G'] = value;
        } else if (key === 'Слот за microSD карта') {
            obj['SD slot'] = value;
        }
    });
    return obj;
};

module.exports = {
    getProductsDetailsTechnopolis,
    getProductsDetailsSmartphone,
};