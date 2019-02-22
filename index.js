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

server.post("/api/projects", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    res.status(422).json({ message: "Name and Description required!" });
  } else {
    db("projects")
      .insert({ name, description })
      .then(result => {
        if (result.rowCount) {
          db("projects").then(projects => {
            res.json(projects);
          });
        } else {
          res.status(400).json({ message: "Failed to add project" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Server Error" });
      });
  }
});

server.post("/api/actions", (req, res) => {
  const { description, project_id, notes } = req.body;

  if (!description || !project_id) {
    res.status(422).json({ message: "Description and Project ID Required!" });
  } else {
    db("projects")
      .where("id", project_id)
      .first()
      .then(project => {
        if (project) {
          db("actions")
            .insert({ description, project_id, notes })
            .then(result => {
              if (result.rowCount) {
                db("actions").then(actions => {
                  res.json(actions);
                });
              } else {
                res.status(400).json({ message: "Failed to add action" });
              }
            });
        } else {
          res.status(400).json({ message: "Project by that id was not found" });
        }
      })
      .catch(() => res.status(500).json({ message: "Server Error" }));
  }
});

server.get("/api/projects/:id", (req, res) => {
  const { id } = req.params;

  db("projects")
    .where({ id })
    .first()
    .then(projects => {
      if (projects) {
        db("actions")
          .where("project_id", id)
          .then(actions => {
            projects.actions = actions;
            res.json(projects);
          });
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(() => res.status(500).json({ message: "Server Error" }));
});

const port = process.env.PORT || 2000;

server.listen(port, () => console.log(`Listening on port ${port}`));
