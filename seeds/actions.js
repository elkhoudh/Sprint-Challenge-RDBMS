exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("actions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          project_id: 1,
          description: "That's that actions",
          notes: "take some notes"
        },
        {
          project_id: 2,
          description: "the second action",
          notes: "beleive in your notes"
        },
        {
          project_id: 3,
          description: "the last action",
          notes: "dont even worry about your notes"
        }
      ]);
    });
};
