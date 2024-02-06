const cloudinary = require("../cloud");
// const FeaturedPost = require("../models/featuredPost");
// const Post = require("../models/post");
const Post = require("../models/staff")

exports.createPost = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
    } = req.body;
    const { file } = req;
    const newPost = new Post({
        name,
        email,
        phone,
        role,
        picture: {
        url: file.picture ? file.picture[0].path : "",
        public_id: 13,
      },
    });

    // console.log("File:", req.file);
    // console.log("Post ID:", newPost._id);

    // Handle thumbnail file
    if (file) {
      const pictureResult = await cloudinary.uploader.upload(
        file.path);
      newPost.picture = {
        url: pictureResult.secure_url,
        public_id: pictureResult.public_id,
      };
    }

    await newPost.save();

    // if (featured) {
    //   await addToFeaturedPost(newPost._id);
    // }

    res.json({
      id: newPost._id,
      name,
      email,
      phone,
      role,
      picture: newPost.picture?.url,

    });
  } catch (error) {
    console.error("Error creating Post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
