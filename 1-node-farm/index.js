const fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");
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
// although that readFileSync is a blocking function, it's okay to put it in the global code top level
// this is because it will be read once in the begninning
// also to avoid reading the entire file each time somebody visits the API route
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathname === "/product") {
    res.end("this is the PRODUCT");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "page not found",
    });
    res.end(`<h1 style="text-align:center">page not found!</h1>`);
  }
});

server.listen(8000, "localhost", () => {
  console.log(`Server is running on port ${8000}!`);
});
