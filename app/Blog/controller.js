const dbPool = require("../../config/db");
const fs = require("fs");
const { getDataDB } = require("../../config/getData");

// let blogs = [];
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Desember",
];

// function menampilkan ttl
function getFullTime(time) {
  let date = time.getDate();
  let monthIndex = time.getMonth();
  let year = time.getFullYear();

  let hours = time.getHours();
  let minutes = time.getMinutes();

  let fulltime = `${date} ${month[monthIndex]} ${year}, ${hours}:${minutes} WIB`;
  return fulltime;
}
module.exports = {
  viewBlog: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const dataQuery = `SELECT tb_user.name AS author, blog.id, blog.title, blog.content, blog.image, blog.post_at  FROM blog LEFT JOIN tb_user ON tb_user.id = blog.author_id`;
      const blogs = await getDataDB(dataQuery);
      blogs.map((blog) => {
        blog.post_at = getFullTime(blog.post_at);
      });
      res.render("Blog/readBlog", {
        blogs,
        isLogin: req.session.user,
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      res.redirect("/blog");
    }
  },
  viewDetailBlog: async (req, res) => {
    try {
      const { id } = req.params;

      const dataQuery = `SELECT tb_user.name AS author, blog.id, blog.title, blog.content, blog.image, blog.post_at  FROM blog LEFT JOIN tb_user ON tb_user.id = blog.author_id  WHERE blog.id=${id}`;
      let blog = await getDataDB(dataQuery);
      blog = blog[0];
      blog.post_at = getFullTime(blog.post_at);
      res.render("Blog/detailBlog", {
        blog,
      });
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      res.redirect("/blog");
    }
  },
  viewCreateBlog: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("Blog/addBlog", {
        alert,
      });
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      res.redirect("/blog");
    }
  },
  actionCreateBlog: async (req, res) => {
    try {
      const { title, content } = req.body;
      const image = req.file.filename;

      if (req.file) {
        const dataQuery = `INSERT INTO blog (title, content, image, author_id) VALUES('${title}','${content}','${image}','${req.session.user.id}')`;
        await getDataDB(dataQuery);
        req.flash("alertMessage", `Successfuly new create blog`);
        req.flash("alertStatus", "success");
        res.redirect("/blog");
      }
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      res.redirect("/blog");
    }
  },
  viewEditBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const dataQuery = `SELECT * FROM blog WHERE id=${id}`;

      let data = await getDataDB(dataQuery);
      res.render("Blog/updateBlog", {
        blog: data[0],
      });
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      req.redirect("/blog");
    }
  },
  actionEditBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const image = req.file.filename;

      // let dataQuery = `UPDATE blog SET title='${title}', content='${content}', image='${image}' WHERE id=${id}`;
      let dataQuery = `SELECT * FROM blog WHERE id=${id}`;
      let oldData = await getDataDB(dataQuery);
      let oldImage = oldData[0].image;
      if (req.file) {
        dataQuery = `UPDATE blog SET title='${title}', content='${content}', image='${image}' WHERE id=${id}`;
      } else {
        dataQuery = `UPDATE blog SET title='${title}', content='${content}', image='${oldImage}' WHERE id=${id}`;
      }
      await getDataDB(dataQuery);
      req.flash("alertMessage", `Successfuly update blog`);
      req.flash("alertStatus", "success");
      res.redirect("/blog");
      // dbPool.connect((err, client, done) => {
      //   client.query(dataQuery, (err, result) => {
      //     done();
      //     let oldImage = result.rows[0].image;
      //     if (req.file) {
      //       dataQueryUpdate = `UPDATE blog SET title='${title}', content='${content}', image='${image}' WHERE id=${id}`;
      //     } else {
      //       dataQueryUpdate = `UPDATE blog SET title='${title}', content='${content}', image='${oldImage}' WHERE id=${id}`;
      //     }
      //     dbPool.connect((err, client, done) => {
      //       client.query(dataQueryUpdate, (err, result) => {
      //         done();
      //         req.flash("alertMessage", `Successfuly update blog`);
      //         req.flash("alertStatus", "success");
      //         res.redirect("/blog");
      //       });
      //     });
      //   });
      // });
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "danger");
      res.redirect("/blog");
    }
  },
  actionDeleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const dataQuery = `DELETE FROM blog WHERE id=${id}`;
      await getDataDB(dataQuery);
      req.flash("alertMessage", `Successfuly delete blog`);
      req.flash("alertStatus", "success");
      res.redirect("/blog");
    } catch (err) {
      req.flash("alertMessage", `${err}`);
      req.flash("alertStatus", "success");
      res.redirect("/blog");
    }
  },
};
