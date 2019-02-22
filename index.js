require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./data/dbConfig");

// server init
const server = express();

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// Routes
server.get("/api/projects", (req, res) => {
  db("projects")
    .then(projects => {
      res.json(projects);
    })
    .catch(() => res.status(500).json({ message: "Server Error" }));
});

const port = process.env.PORT || 2000;

server.listen(port, () => console.log(`Listening on port ${port}`));
