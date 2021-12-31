const bcrypt = require("bcrypt");
const dbPool = require("../../config/db");
const { getDataDB } = require("../../config/getData");

module.exports = {
  viewSignIn: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("Login/signIn", {
        alert,
      });
    } catch (err) {
      console.log(err.message);
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const dataQuery = `SELECT * FROM tb_user WHERE email='${email}';`;
      const dataUser = await getDataDB(dataQuery);
      if (!dataUser.length) {
        req.flash("alertMessage", "Email not register!");
        req.flash("alertStatus", "danger");
        res.redirect("/sign-in");
      } else {
        let isMatch = bcrypt.compareSync(password, dataUser[0].password);
        if (isMatch) {
          req.session.user = {
            id: dataUser[0].id,
            name: dataUser[0].name,
            email: dataUser[0].email,
            password: dataUser[0].password,
          };
          req.flash("alertMessage", "Successfuly login!");
          req.flash("alertStatus", "success");
          res.redirect("/blog");
        } else {
          req.flash("alertMessage", "Wrong Email/Password!");
          req.flash("alertStatus", "danger");
          res.redirect("/sign-in");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  viewSignUp: async (req, res) => {
    try {
      res.render("Login/signUp");
    } catch (err) {
      console.log(err.message);
    }
  },
  actionSignUp: async (req, res) => {
    try {
      const { name, email, password, verifyPassword } = req.body;
      if (password === verifyPassword) {
        const hashPassword = bcrypt.hashSync(password, 10);
        const dataQuery = `INSERT INTO tb_user (name, email, password) VALUES('${name}','${email}','${hashPassword}')`;
        await getDataDB(dataQuery);
        res.redirect("/sign-in");
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  actionSignOut: async (req, res) => {
    req.session.destroy();
    res.redirect("/blog");
  },
};
