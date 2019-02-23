exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        { name: "Sprint 1", description: "Sprint challenge 1" },
        { name: "Sprint 2", description: "Sprint challenge 2" },
        { name: "Sprint 3", description: "Sprint challenge 3" }
      ]);
    });
};
