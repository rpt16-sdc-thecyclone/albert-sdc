const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const { save, retrieve, findOne } = require('../db/mongo');
const psql = require('../db/postgres.js');

const dist = path.resolve('client', 'dist');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(dist));

// app.get('/data', (req, res) => {
//   save(() => {
//     retrieve().then((resu) => {
//       res.send(resu).status(200);
//     });
//   });
// });

// app.get('/suggested', (req, res) => {
//   const prodId = req.query.prod_id;
//   if (prodId === 1 && prodId !== undefined) {
//     findOne()
//       .then((r) => {
//         res.status(200).send(r);
//       })
//       .catch(() => res.status(400));
//   } else if (prodId !== 1) {
//     // If you resave it then it'll randomize positions of products each time
//     save(() => {
//       retrieve().then((resu) => {
//         res.send(resu).status(200);
//       });
//     });
//   } else {
//     res.status(400).send('Try Again');
//   }
// });


app.listen(3001 || process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('On port 3001');
});
