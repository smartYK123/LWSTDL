

const { createPost,setDefaultPicture } = require("../controllers/post");
// const {parseData} = require("../middleware");
const multer = require("../middleware/multer");
const { postValidator, validate } = require("../middleware/postValidator");
const router = require("express").Router();

router.post(
  "/send-data",
  multer.single("picture"),
  createPost
);

// Route to set default picture for all users
router.post("/default-picture", setDefaultPicture);

module.exports = router;
