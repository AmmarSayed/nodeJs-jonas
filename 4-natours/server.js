// order matters
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;

const app = require('./app');

///////////////////////
// 4) START SERVER
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🏃‍♂️...`);
});
