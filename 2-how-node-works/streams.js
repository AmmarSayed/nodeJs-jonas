const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1, node will have to read the entire file in memory then will send to to the client
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  ////////////////////////
  // Solution 2: Streams
  // this also cannot handle the data fast,
  //
  //   const readable = fs.createReadStream("./testt-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not Found!");
  //   });

  ////////////////////////
  // Solution 3: Streams using pip
  // this will resolve the back pressure, and it's a straight forward solution to consume and write streams
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
  // we need readable source , redableSource.pip(writableDest)
});

server.listen(8000, "localhost", () => {
  console.log("Server is running...");
});
