const express = require("express");
const { isLoginAuth } = require("../middleware/auth");
const upload = require("../middleware/image");
const router = express.Router();
const {
  viewBlog,
  viewCreateBlog,
  actionDeleteBlog,
  actionCreateBlog,
  viewEditBlog,
  actionEditBlog,
  viewDetailBlog,
} = require("./controller");
// read
router.get("/blog", viewBlog);
// detail
router.get("/blog-detail/:id", viewDetailBlog);
// create
router.get("/add-blog", isLoginAuth, viewCreateBlog);
router.post("/add-blog", isLoginAuth, upload.single("image"), actionCreateBlog);
// update
router.get("/edit-blog/:id", isLoginAuth, viewEditBlog);
router.put(
  "/edit-blog/:id",
  isLoginAuth,
  upload.single("image"),
  actionEditBlog
);
// delete
router.delete("/delete-blog/:id", isLoginAuth, actionDeleteBlog);

module.exports = router;
