const { getDataDB } = require("../../config/getData");

module.exports = {
  viewHome: async (req, res) => {
    try {
      const dataQuery = `SELECT * FROM experience`;
      const experiences = await getDataDB(dataQuery);
      res.render("index", {
        experiences,
        title: "Home",
      });
    } catch (err) {
      console.log(err);
    }
  },
  viewContactMe: async (req, res) => {
    try {
      res.render("contact", {
        title: "Contact Me",
      });
    } catch (err) {
      console.log(err);
    }
  },
};
