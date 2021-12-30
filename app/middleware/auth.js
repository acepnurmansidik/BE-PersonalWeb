module.exports = {
  isLoginAuth: async (req, res, next) => {
    try {
      if (req.session.user === undefined || req.session.user === null) {
        res.redirect("/sign-in");
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
