/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
const mongoose = require('mongoose');
const fakerAPI = require('./faker');
mongoose.connect('mongodb://localhost/fecRepo', {
  useNewUrlParser: true
});
// Need below for docker.
// mongoose.connect('mongodb://ec2-54-215-211-187.us-west-1.compute.amazonaws.com:27017/', { useNewUrlParser: true })
//   .catch((err) => console.error(err));


const db = mongoose.connection;
db.once('open', () => {
  console.log('open!');
});


const repoSchema = mongoose.Schema({
  image: String,
  productTitle: String,
  shippingCost: Number,
  price: Number,
});

const repo = mongoose.model('repos', repoSchema);


const save = (cb) => {
  const records = fakerAPI.fakerData();
  records.then((r) => {
    repo.deleteMany((err) => {
      if (err) throw err;
      else {
        repo.insertMany(r, (error, result) => {
          if (error) throw error;
          else {
            cb(result);
          }
        });
      }
    });
  });
};

const findOne = () => {
  return new Promise((resolve) => {
    repo.findOne({
        productTitle: 'Chewbacca w/ Sound Star Wars 15" Plush Toy'
      })
      .then((r) => {
        repo.findOne({
            productTitle: 'Chewbacca Star Wars Talking Stuffed Animal Plush Wookie Doll 8" Inches'
          })
          .then((f) => resolve([r, f]));
      });
  });
};


const retrieve = () => {
  return new Promise((resolve, reject) => {
    repo.find({}, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });
};


const insertOne = (obj) => {
  return new Promise((resolve, reject) => {
    repo.create({
      image: obj.image,
      productTitle: obj.productTitle,
      shippingCost: obj.shippingCost,
      price: obj.price,
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}
const updateOne = (productTitle, obj) => {
  return new Promise((resolve, reject) => {
    repo.updateOne({
      productTitle: productTitle
    }, {
      $set: {
        "productTitle": obj.productTitle
      }
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

const deleteOne = (productTitle) => {
  return new Promise((resolve, reject) => {
    repo.deleteOne({
      productTitle: productTitle
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}
module.exports = {
  save,
  retrieve,
  db,
  repo,
  findOne,
  updateOne,
  deleteOne,
  insertOne
};