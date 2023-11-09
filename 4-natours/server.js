const app = require('./app');
const PORT = 8000;

///////////////////////
// 4) START SERVER
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...🏃‍♂️...`);
});
