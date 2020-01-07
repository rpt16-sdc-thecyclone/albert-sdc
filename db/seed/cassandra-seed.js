const cassandra = require('cassandra-driver');
const path = require('path');
const csvFile = path.resolve('output.csv');
const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1'
});

client.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected to cassandra');
    }
});
// id uuid primary key,image text, productName text, shippingCost int, price int
client.execute(`CREATE KEYSPACE IF NOT EXISTS sdc WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'}`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res);
    }
});

client.execute('CREATE TABLE IF NOT EXISTS sdc.related_products (id int primary key, image text, productName text, shippingCost int, price int)', (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res);
    }
})
client.execute('TRUNCATE sdc.related_products', (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res);
    }
});
//  can't use below command. COPY is a cql shell command .
client.execute(`COPY sdc.related_products FROM ${csvFile} WITH DELIMITER=',' and HEADER=TRUE`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res);
    }
})
// client.execute(`CREATE KEYSPACE IF NOT EXISTS sdc WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'}`)
//     .then(() => {
//         client.execute(`CONSISTENCY ALL`, () => {
//             console.log('executed consistency');
//         });
//     })
//     .then(() => {
//         client.execute('CREATE TABLE IF NOT EXISTS sdc.related_products (id int primary key, image text, productName text, shippingCost int, price int)')
//         console.log('executed table creation');
//     })
//     .then(() => {
//         client.execute('TRUNCATE sdc.related_products');
//         console.log('executed truncate');
//     })
//     .then(() => {
//         console.log('copying');
//         client.execute(`COPY sdc.related_products FROM ${csvFile} WITH DELIMITER=',' and HEADER=TRUE`, (err, res) => {
//             if (err) {
//                 return err;
//             }
//             console.log('copied to cassandra', res);
//         })
//     })
//     .catch(error => {
//         console.log(error);
//     })

// client.execute(copyQuery)
//     .then(result => {
//         console.log('Successfully insert data', result);
//     })
//     .catch(error => {
//         console.log(error);
//     })