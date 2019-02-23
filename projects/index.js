const express = require("express");
const db = require("../data/dbConfig");

const route = express.Router();

route.get("/", (req, res) => {
  db("projects")
    .then(projects => {
      res.json(projects);
    })
    .catch(() => res.status(500).json({ message: "Server Error" }));
});

route.put("/:id", (req, res) => {
  const { id } = req.params;
  db("projects")
    .where({ id })
    .update(req.body)
    .then(result => {
      if (result) {
        db("projects").then(projects => {
          res.json(projects);
        });
      } else {
        res.status(400).json({ message: "Failed to update projects" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where("project_id", id)
    .del()
    .then(() => {
      db("projects")
        .where({ id })
        .del()
        .then(result => {
          if (result) {
            db("projects").then(projects => {
              res.json(projects);
            });
          } else {
            res.status(400).json({ message: "Faiuled to delete project" });
          }
        });
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.post("/", (req, res) => {
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

route.get("/:id", (req, res) => {
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
module.exports = route;
