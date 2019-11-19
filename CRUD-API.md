# CRUD API

## PUT Request
URL: http://localhost:3001/update/:productTitle

Request
```
app.put('/update/:productTitle', (req, res) => {
  updateOne(req.params.productTitle, req.body)
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      console.log(error);
    })
})
```
Response:
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

## DELETE Request
URL: http://localhost:3001/delete/:productTitle

Request:
```
app.delete('/delete/:productTitle', (req, res) => {
  deleteOne(req.params.productTitle)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    })
})
```
Response:
```
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

## POST Request
URL: http://localhost:3001/create/

Request:
```
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
```

Response:
```
{
    "_id": "5dd3805dc74c773a38b40e4c",
    "image": "https://  fec-albert.s3.us-west-1.amazonaws.com/      julian-o-hayon-oW4tZeidfkA-unsplash.jpg",
    "productTitle": "RandomTitle",
    "shippingCost": 10,
    "price": 10,
    "__v": 0
}
```