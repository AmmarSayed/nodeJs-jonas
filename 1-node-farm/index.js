const fs = require("fs");
const http = require("http");

////////////////////////////////////
// FILES

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written");

// non blocking, asynchronous code "Callback hell"
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile(`./txt/final.txt`, `${data2}\n\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😁");
//       });
//     });
//   });
// });

// console.log("Last comment");

////////////////////////////////////
// SERVER
const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the server");
});

server.listen(8000, "localhost", () => {
  console.log(`Server is running on port ${8000}!`);
});
