const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

// observe / wait for the event
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});

// observe / wait for the event
myEmitter.on("newSale", () => {
  console.log("Consumer name: Ammar");
});

// observe / wait for the event
myEmitter.on("newSale", (stock) => {
  console.log(`there are now ${stock} items left in stock`);
});

// .emit as if dispatching a click event
myEmitter.emit("newSale", 9);

////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  console.log(req.url);
  res.end("request received ");
});

server.on("request", (req, res) => {
  console.log("Another request 😁 ");
});

server.on("close", () => {
  console.log("Server closed 🔒");
});

server.listen(8000, "localhost", () => {
  console.log("Waiting for requests....");
});
