// order matters
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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

const PORT = process.env.PORT || 3000;

const app = require('./app');

///////////////////////
// 4) START SERVER
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🏃‍♂️...`);
});
