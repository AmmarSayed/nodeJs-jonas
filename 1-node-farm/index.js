const fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const server = http.createServer((req, res) => {
  const myURL = url.parse(req.url, true);
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHTML = dataObject.map((el) => replaceTemplate(tempCard, el)).join("");

    res.end(tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML));

    // product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const proudct = dataObject[query.id];
    const output = replaceTemplate(tempProduct, proudct);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // not found
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
