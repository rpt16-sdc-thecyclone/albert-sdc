const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {
  save,
  retrieve,
  findOne,
  updateOne,
  deleteOne,
  insertOne
} = require('../db/mongo');

const dist = path.resolve('client', 'dist');


const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(dist));

app.get('/data', (req, res) => {
  save(() => {
    retrieve().then((resu) => {
      res.send(resu).status(200);
    });
  });
});

app.get('/suggested', (req, res) => {
  const prodId = req.query.prod_id;
  if (prodId === 1 && prodId !== undefined) {
    findOne()
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => res.status(400));
  } else if (prodId !== 1) {
    // If you resave it then it'll randomize positions of products each time
    save(() => {
      retrieve().then((resu) => {
        res.send(resu).status(200);
      });
    });
  } else {
    res.status(400).send('Try Again');
  }
});

//Update
app.put('/update/:productTitle', (req, res) => {
  updateOne(req.params.productTitle, req.body)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
})

//Delete
app.delete('/delete/:productTitle', (req, res) => {
  deleteOne(req.params.productTitle)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    })
})

//Create
app.post('/create', (req, res) => {
  insertOne(req.body)
    .then((result) => {
      // console.log('result', result);
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
})


app.listen(3001 || process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('On port 3001');
});