const multer = require("multer");

// initialize multer diskstorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //   save file storage location
    cb(null, `public/uploads/blog`);
  },

  filename: (req, file, cb) => {
    // catch extension
    const originalExt =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    // formula filename
    let filename = `${Math.random().toString(36).split(".")[1]}${Date.now()}${
      Math.random().toString(36).split(".")[1]
    }.${originalExt}`;
    // run callback
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
