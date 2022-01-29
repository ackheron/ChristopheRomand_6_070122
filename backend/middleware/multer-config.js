const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "wbp",
};
/* ################################################ */

/* ##############   MIDDLEWARE   ################## */
const storage = multer.diskStorage({
  // - 03 -

  destination: (request, file, callback) => {
    callback(null, "images");
  },
  filename: (request, file, callback) => {
    const name = Math.floor(Math.random() * 19423798 * Date.now());
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + "." + extension);
  },
});
/* ################################################ */

/* ##############   EXPORT   ###################### */
// - 04 -
module.exports = multer({ storage: storage }).single("image");
/* ################################################ */
