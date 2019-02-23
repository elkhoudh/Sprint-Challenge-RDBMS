require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// server init
const server = express();

// Routes
const projectsRoute = require("./projects");
const actionsRoute = require("./actions");

// Middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// Routes
server.use("/api/projects", projectsRoute);
server.use("/api/actions", actionsRoute);

const port = process.env.PORT || 2000;

server.listen(port, () => console.log(`Listening on port ${port}`));
