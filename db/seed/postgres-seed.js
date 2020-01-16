const fs = require('fs');
const faker = require('faker');
const { client, pool } = require('../postgres.js');
//image VARCHAR, productTitle VARCHAR, shippingCost INT, price INT
const path = require('path');
const csvFile = path.resolve('output.csv');

let copyPG = () => {
    // console.log('finished writing to CSV');
    console.time('postgres', 'psql start');
    client.connect();
    client.query(`CREATE TABLE IF NOT EXISTS relatedProducts(prod_id INTEGER PRIMARY KEY, image VARCHAR, productTitle VARCHAR, shippingCost INTEGER, price INTEGER)`)
        .then(() => {
            client.query(`TRUNCATE TABLE relatedProducts`)
                .then(() => {
                    client.query(`COPY relatedProducts(prod_id, image, productTitle, shippingCost, price) FROM '${csvFile}' DELIMITER ',' CSV HEADER`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        // console.log('psql data insertion complete')
                        console.timeEnd('postgres', 'psql end');
                        client.end();
                    })
                })
        })

};
copyPG();