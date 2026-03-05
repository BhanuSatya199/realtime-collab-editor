require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const pool = require("./db");
const setupWebSocket = require("./ws/websocket");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/documents", require("./routes/documents"));

app.get("/health", (req, res) => {
  res.send("OK");
});

const server = http.createServer(app);
setupWebSocket(server);

server.listen(process.env.APP_PORT, () => {
  console.log("Server running on port", process.env.APP_PORT);
});