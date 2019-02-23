const express = require("express");
const db = require("../data/dbConfig");

const route = express.Router();

route.post("/", (req, res) => {
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

route.get("/", (req, res) => {
  db("actions")
    .then(actions => {
      res.json(actions);
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.get("/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where({ id })
    .first()
    .then(action => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: "Action not found!" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

route.put("/:id", (req, res) => {
  const { id } = req.params;
  db("actions")
    .where({ id })
    .update(req.body)
    .then(result => {
      if (result) {
        db("actions").then(actions => {
          res.json(actions);
        });
      } else {
        res.status(400).json({ message: "Failed to update action" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = route;
