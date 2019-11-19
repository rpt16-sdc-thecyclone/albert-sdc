/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-console */
// const aws = require('aws-sdk');
// const config = require('../config.json');

// module.exports = (async function () {
//   try {
//     aws.config.setPromisesDependency();
//     aws.config.update({
//       accessKeyId: config.aws.accessKey,
//       secretAccessKey: config.aws.secretKey,
//     });

//     const s3 = new aws.S3();
//     const response = await s3.listObjectsV2({
//       Bucket: 'fecquarkalex',
//     }).promise();

//     const url = 'https://fecquarkalex.s3-us-west-1.amazonaws.com/';

//     const urlList = [];
//     // eslint-disable-next-line array-callback-return
//     response.Contents.map((photos) => {
//       const photoKey = photos.Key;
//       const photoURL = url + encodeURIComponent(photoKey);
//       urlList.push(photoURL);
//     });
//     return urlList;
//   } catch (e) {
//     console.error('this is error: ', e);
//   }
// }());
