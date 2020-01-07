const fs = require('fs');
const faker = require('faker');
const { client, pool } = require('../postgres.js');
//image VARCHAR, productTitle VARCHAR, shippingCost INT, price INT
const path = require('path');
// const csvFile = path.resolve('output.csv');
let dataGen = (i) => {
    // FIX below later: use static files hosted on S3.
    let image = faker.image.imageUrl();
    let productName = faker.commerce.productName();
    let shippingCost = faker.commerce.price(2, 10);
    let price = faker.commerce.price(10, 1000);
    let data = '';
    data += `${i}, ${image}, ${productName}, ${parseInt(shippingCost)}, ${parseInt(price)}\n`
    return data;
}

let seed = () => {
    let csvwriter = fs.createWriteStream('output.csv');
    //faker data

    // appendfile after reaching certain length of data, then empty
    // appendfile will create if file doesn't exist
    let fakeData = 'id, image, productTitle, shippingCost, price\n';
    for (let i = 1; i <= 50; i++) {
        fakeData += dataGen(i);
        if (i % 10 === 0) {
            csvwriter.write(fakeData);
            fakeData = '';
        }
    }
};
seed();