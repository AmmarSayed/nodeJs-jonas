const fs = require('fs');
const superagent = require('superagent');

// promisify readFile
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`Could not find the file 🙁!`);
      resolve(data);
    });
  });
};

// promisify writeFile
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`Could not find the file 🙁!`);
      resolve('Success');
    });
  });
};

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch((err) => {
//       return console.log(err.message);
//     });
// });

// Will return a promise
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    //superagent will return a promise
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);

    // will return a promise
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then((res) => {
    console.log(res);
    console.log('Randome dog image saved to file!');
  })
  .catch((err) => {
    return console.log(err.message);
  });
