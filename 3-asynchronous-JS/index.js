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

// SOLUTION using promises
// Will return a promise
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     //superagent will return a promise
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     // will return a promise
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then((res) => {
//     console.log(res);
//     console.log('Randome dog image saved to file!');
//   })
//   .catch((err) => {
//     return console.log(err.message);
//   });

// SOLUTION using ASYNC/AWAIT
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    //superagent will return a promise
    const dogData = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    await writeFilePro('dog-img.txt', dogData.body.message);
    console.log('Randome dog image saved to file!');
  } catch (error) {
    // thorw an error
    throw error.message;
  }
  return `2: Ready 🐶`;
};

// getDogPic()
//   .then((x) => console.log(x))
//   .catch((err) => console.log(`ERROR ${err} 💥`));

// IIFE
(async () => {
  try {
    console.log('1: will get dog pics!');

    const x = await getDogPic();
    console.log(x);

    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log(`ERROR ${err} 💥`);
  }
})();

/////////////////////
// Getting multiple dog pictures
const getMultiDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    //superagent will return a promise
    const dogData1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const dogData2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const dogData3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const dogData4 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([dogData1, dogData2, dogData3, dogData4]);
    const urls = all.map((re) => re.body.message);
    console.log(urls);

    await writeFilePro('dog-img.txt', urls.join('\n'));
    console.log('Randome dog image saved to file!');
  } catch (error) {
    // thorw an error
    throw error.message;
  }
  return `2: Ready 🐶`;
};

// IIFE
(async () => {
  try {
    console.log('1: will get dog pics!');

    const x = await getMultiDogPic();
    console.log(x);

    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log(`ERROR ${err} 💥`);
  }
})();
