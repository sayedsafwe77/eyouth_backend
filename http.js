import { createServer } from "http";
// import { data } from "./data.mjs";
// import { v4 as uuidv4 } from "uuid";

// let events = data;
const server = createServer((req, res) => {
  if (req.url == "/events" && req.method == "GET") {
    res.end(JSON.stringify(events));
  } else if (req.url.startsWith("/events") && req.method == "GET") {
    const id = req.url.split("/")[2];
    const event = events.find((event) => event.id === id);
    if (event) {
      res.end(JSON.stringify(event));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Event not found" }));
    }
  } else if (req.url == "/events" && req.method == "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newEvent = JSON.parse(body);
      newEvent.id = uuidv4();
      events.push(newEvent);
      res.end(JSON.stringify(newEvent));
    });
  } else if (req.url.startsWith("/events") && req.method == "PUT") {
    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      let updatedEvent;
      events = events.map((event) => {
        if (event.id == id) {
          updatedEvent = JSON.parse(body);
          updatedEvent.id = id;
          return updatedEvent;
        }
        return event;
      });
      res.end(JSON.stringify(updatedEvent));
    });
  }
});
server.listen(3002, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3002");
});
