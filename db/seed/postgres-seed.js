const fs = require('fs');
const faker = require('faker');
const { client, pool } = require('../postgres.js');
//image VARCHAR, productTitle VARCHAR, shippingCost INT, price INT
const path = require('path');
const csvFile = path.resolve('output.csv');

let copyPG = () => {

    console.log('finished writing to CSV');
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS relatedProducts(image VARCHAR, productTitle VARCHAR, shippingCost INTEGER, price INTEGER)`)
        .then(() => {
            client.query(`TRUNCATE TABLE relatedProducts`)
        })
        .then(() => {
            client.query(`COPY relatedProducts(image, productTitle, shippingCost, price) FROM '${csvFile}' DELIMITER ',' CSV HEADER`, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('psql completed copy')
                client.end();
            })

            
        })
};
copyPG();