// order matters
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

// connection to Database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`DB connection successfull`);
  })
  .catch((err) => console.log(err));

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/tours-simple.json`,
    'utf-8',
  ),
);

// import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete All dat afrom DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log('Data Successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
