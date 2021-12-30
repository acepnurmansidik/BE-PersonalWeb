const dbPool = require("../../config/db");

module.exports = {
  viewHome: async (req, res) => {
    try {
      const dataQuery = `SELECT * FROM experience`;
      dbPool.connect((err, client, done) => {
        if (err) throw err;

        client.query(dataQuery, (err, result) => {
          done();
          const experiences = result.rows.sort();
          res.render("index", {
            experiences,
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
  viewContactMe: async (req, res) => {
    try {
      res.render("contact");
    } catch (err) {
      console.log(err);
    }
  },
};
