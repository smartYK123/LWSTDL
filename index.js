// const postRouter= require('./routers/post');
// require("./db");
require("express-async-errors");
require("dotenv").config();
// const morgan = require('morgan')
// app.use(morgan('dev'));
// const commentRoutes = require('./routes/commentRoutes');
const commentRoutes = require("./routers/commentRoute")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const trainingRequestsRouter = require('./routers/trainingRequests');
// const videoRouter = require('./routes/videoRouter');
const videoRouter = require("./routers/videoRouter")
const nodemailer = require("nodemailer");
// const port = 8000;
// const port = process.env.PORT;
const cors = require("cors");
// const likeRoutes = require('./routes/likeRoutes');
const likeRoutes = require("./routers/likeRouter")
const session = require("express-session");
const postRouter = require("./routers/post");
const homeLikeRoutes = require("./routers/homeLikeRouter");
const homeCommentRoutes = require("./routers/homeCommentRouter")


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const secret = crypto.randomBytes(32).toString("hex");
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);
const jwt = require("jsonwebtoken");
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to Mongodb");
  })
  .catch((err) => {
    console.log("Error connecting to Mongodb", err);
  });
// Generate a consistent secret key
// const secretKey = crypto.randomBytes(32).toString("hex");
const Informals = require("./models/informals");
const Spirit = require("./models/spirit");
const Trending = require("./models/trend");
const Classics = require("./models/classics");
const Category = require("./models/category");
const Courses = require("./models/courses")
const Product = require("./models/productData")
const User = require("./models/user");
const Staff = require("./models/staff");
const Order = require("./models/order");
const Elite = require("./models/elite");
// const secretKey = require("./secret");
const morgan = require("morgan");

// const { Console } = require("console");
// functon to send Verification Email to user
const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailer to send mail to the user
  const transporter = nodemailer.createTransport({
    //configure the node service
    service: "gmail",
    auth: {
      user: "turnermarvelous@gmail.com",
      pass: "bgyhbmpcdyvsmvxk",
    },
  });
  app.use(morgan("dev"));
  // compose email message
  const mailOption = {
    from: "turnermarvelous@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://02e6-102-89-47-48.ngrok-free.app/${verificationToken}`,
  };
  // send email
  try {
    await transporter.sendMail(mailOption);
    return res
      .status(200)
      .json({ message: "Verification email sent successfully" });
  } catch (err) {
    console.log("Error sending verification email", err);
    return res
      .status(500)
      .json({ message: "Error sending verification email" });
  }
};
app.use(postRouter);
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});


app.use('/videos', videoRouter);
app.post("/register", async (req, res) => {
  try {
    const { name, department, number, email, password, job, picture } = req.body;
    console.log("Request Body:", req.body);
    // Check if all required fields are present
    // if (!name || !email || !password || !department || !number || !job) {
    //   return res
    //     .status(400)
    //     .json({ message: "Name, email, password, department, number, and job are required" });
    // }

    // Check if the email already exists
    const existingUser = await Elite.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Set default picture if not provided
    const defaultPicture = {
      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAARVBMVEXk5ueutLcfHx8eHh4dHR0AAAC6vL3p6+xsbW0YGBgaGhoIBwfa3d4VFRUPDg7d4OHP0tS/xMbHy820ub1aWls4ODmXmJhOxJGEAAADvklEQVR4nO3c23KbMBAGYAgEbCJbHNK+/6MWGYix0WF3ddpm+Gfai3Rqf1mJBSSG4oNhitwAXf5HVLX+Wf7S/7vpv2A+6fWHO1SVN0fU7c4i3R51/b6wyJ9uh/ps2oJB2sv9iaqYoIrLvdpQVc0IVS2oihOq3lA1K1TFEFU/UPPodfxQNSPUF8dKfXVqUnGrVKdKdaKcmVEdRxTLSp0oUE4UNCcKmhMFzYmC5kRBExol5zBCtYXox6GZMwxjL31+vVAo2TflS6ZeZEbJcSoPmQZB/LggqP4oWjLQ5lcAlGhMJjWIeVCjmaQy5kA5TPMQpkcNLlNZNqlRzjqRauWHMh52fiovFNCEnu0+KKnpmIbgursPCjDJt+AmuwcKPHjoAfRAWRq5JpgTDh2FKhSuVHQUYkapTIhSkVECZypLxKmZjAL18n0QByAZBe9RW+DjR0WhRw8zflQU8thTgZ8BqSjksacyRUfhOueCAp8AiSjEufgZlijwTCeiCAcfUxT49HeiOKJYzqnYKJZ9imVH53nuY3mVwPJ6iuWVJ89rdPSkSnE3g20K8Ibw6+6QWa4l8Fx1aRFdHd7NPVGFhKNwa/y/bs0T3EGTrg4DLxbQq/sJdhwwy2VhUIC9Gfz2WvRdLMJ+UZD9PstVTK79PrVZaywTbR85zB6y0O0hl3n3kAtVrffd9jH3bvviUo8lTHOaYfTY/w+LWmmPDuD3OaFQbSGF6H8ihPSABUBJ9TjJPGpvc2oexb6nPfjiiVLzyHqzNSlZStTh+RYzDOeibxgBRVvPwrhoKNkTFjjg7Z2Eem+U8HLFQmkfS4IGdoLGotreg7RUy/2LI1GCMJcOLOfcwqHQSy36uMYQgyItCWvjWO2Ao9pAZVpU1pkFRskAs2kf2/0pFCWJrckcyx0FEGW7OaDGfD8IQ5E2GNwqL1SMOj1UhlqBUJFMxnkFQQWf4y4VABWyPx2ibe5uFGEXBhNdb3ei4hx4z+gG0IXCrLbSomntLlS4k7Axx77gQkUvlK5UDlSCQmlaqAOVoFCaUtlRKQqlOQfaUVH75jPvHdSOSjJ6x15lRcW6OnhPIxGoyGeYZwQcFfRWwZoegUo0peam0MJRiabUPKngqHhXnAcUYqKLZEGgcuVEQXOioDlR0LBFsXwDDr8XGG1vVVrfP8Uiry/F+tuwyPdth+o+eeRWb+80U6q6667X6y1j5q/vVD+oft6T91A9XNmivr9eCrWiNlUuV7eSFtNHsb2hsl7SZcn65atpQ6n3ZtZ5s3t95j968IutTColwgAAAABJRU5ErkJggg==",
      public_id: "101",
    };

    const newUser = new Elite({
      name,
      email,
      department,
      number,
      password,
      job,
      picture: picture || defaultPicture, // Use provided picture or default picture
    });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save user into the database
    await newUser.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});
// app.post("/register", async (req, res) => {
//   try {
//     const { name, department, number, email, password, job } = req.body;

//     // Log the received request body
//     // console.log("Received request body:", req.body);

//     // Check if all required fields are present
//     if (!name || !email || !password || !department || !number || !job) {
//       return res
//         .status(400)
//         .json({ message: "Name, email, and password are required" });
//     }

//     // Check if the email already exists
//     const existingUser = await Elite.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     // Create a new user instance
//     const newUser = new Elite({ name, email, department, number, password, job });

//     // Generate and store the verification token
//     newUser.verificationToken = crypto.randomBytes(20).toString("hex");

//     // Save user into the database
//     await newUser.save();

//     // Send verification email to user
//     // sendVerificationEmail(newUser.email, newUser.verificationToken);

//     // Respond with success message
//     res.status(200).json({ message: "Registration successful" });
//   } catch (err) {
//     // Log any errors that occur during registration
//     console.log("Error registering user:", err);

//     // Respond with an error message
//     res.status(500).json({ message: "Registration failed" });
//   }
// });


app.use('/training-requests', trainingRequestsRouter);

app.post("/spirit", async (req, res) => {
  try {
    const { id, user, title, media, description, image } = req.body;
    const newSpirit = new Spirit({
      id,
      user,
      title,
      image,
      media: {
        type: media.type,
        content: media.content,
        thumbnail: media.thumbnail,
      },
      description,
    });

    const savednewSpirit = await newSpirit.save();

    console.log(savednewSpirit);
    res.status(201).json(savednewSpirit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/trending/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const { title, description, image, media } = req.body; // Extract the updated fields from the request body

    // Construct the update object based on the provided fields
    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (image) update.image = image;
    if (media) {
      update["media.type"] = media.type;
      update["media.content"] = media.content;
      update["media.thumbnail"] = media.thumbnail;
    }

    // Find the document by ID and update it with the new values
    const updatedTrend = await Trending.findByIdAndUpdate(id, update, { new: true });

    // Check if the document was found and updated
    if (!updatedTrend) {
      return res.status(404).json({ error: "Trending not found" });
    }

    // If successfully updated, return the updated document
    res.json(updatedTrend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/trending", async (req, res) => {
  try {
    const { id, user, title, media, description, image } = req.body;
    const newTrends = new Trending({
      id,
      user,
      title,
      image,
      media: {
        type: media.type,
        content: media.content,
        thumbnail: media.thumbnail,
      },
      description,
    });

    const savedTrends = await newTrends.save();

    console.log(savedTrends);
    res.status(201).json(savedTrends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/courses", async (req, res) => {
  try {
    const { id, user, title, media, description, image } = req.body;
    const newCourse = new Courses({
      id,
      user,
      title,
      image,
      media: {
        type: media.type,
        content: media.content,
        thumbnail: media.thumbnail,
      },
      description,
    });

    const savedCourses = await newCourse.save();

    console.log(savedCourses);
    res.status(201).json(savedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/product", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    imageUri: req.body.imageUri,
    screenName: req.body.screenName,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/informal", async (req, res) => {
  try {
    const { id, user, title, media, description, image } = req.body;
    const newInformals = new Informals({
      id,
      user,
      title,
      image,
      media: {
        type: media.type,
        content: media.content,
        thumbnail: media.thumbnail,
      },
      description,
    });

    const savedInformals = await newInformals.save();

    console.log(savedInformals);
    res.status(201).json(savedInformals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/classics", async (req, res) => {
  try {
    const { id, user, title, media, description, image } = req.body;
    const newClassics = new Classics({
      id,
      user,
      title,
      image,
      media: {
        type: media.type,
        content: media.content,
        thumbnail: media.thumbnail,
      },
      description,
    });

    const savedClassics = await newClassics.save();

    console.log(savedClassics);
    res.status(201).json(savedClassics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/classics", async (req, res) => {
  try {
    const data = await Classics.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/spirit", async (req, res) => {
  try {
    const data = await Spirit.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/courses", async (req, res) => {
  try {
    const data = await Courses.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/trending", async (req, res) => {
  try {
    const data = await Trending.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/informal", async (req, res) => {
  try {
    const data = await Informals.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/category", (req, res) => {
  const { id, title, name, movies } = req.body;

  const newCategory = new Category({
    id,
    title,
    name,
    movies: movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      carousel: {
        title: movie.carousel.title,
        image: movie.carousel.image,
        video: movie.carousel.video,
        comments: movie.carousel.comments,
      },
    })),
  });

  newCategory
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


app.post("/category/:categoryId/movies", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const newMovieData = req.body;

    // Find the category by ID and push the new movie to the beginning of its movies array
    const category = await Category.findOneAndUpdate(
      { id: categoryId },
      { $push: { movies: { $each: [newMovieData], $position: 0 } } },
      { new: true }
    );

    if (!category) {
      // If category is not found, return a 404 response
      res.status(404).json({ error: "Category not found" });
    } else {
      // Return the updated category
      res.status(201).json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/category/:categoryId/movies/:movieId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const movieIdToDelete = req.params.movieId;

    // Find the category by ID and pull the movie from its movies array
    const category = await Category.findOneAndUpdate(
      { id: categoryId },
      { $pull: { movies: { id: movieIdToDelete } } },
      { new: true }
    );

    if (!category) {
      // If category is not found, return a 404 response
      res.status(404).json({ error: "Category not found" });
    } else {
      // Return the updated category
      res.status(200).json(category);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/category", (req, res) => {
  Category.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});



// Backend Route for Updating User Information
app.put("/update-profile", async (req, res) => {
  try {
    const { name, email, job, number } = req.body;

    // Find the user by email and update their information
    const updatedUser = await Elite.findOneAndUpdate(
      { email: email },
      { name, job, number },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with success message and updated user information
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//end point too verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //Find the user with the given verification token
    const user = await Elite.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Email Verification Failed" });
    console.log("Error processing", err);
  }
});
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();
// Export the secretKey variable
module.exports = {
  secretKey: secretKey
};
app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, secretKey);
    console.log("Secret Key:", secretKey);
    console.log("Token:", token);
    const useremail = user.email;
    Elite.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    // console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// const jwt = require('jsonwebtoken');

// Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await Elite.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token with user ID and other user data
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name /* other user data */,
      },
      secretKey
    );
    console.log("Secret Key:", secretKey);
    console.log("Token:", token);
    // Send token and user data in the response
    res.status(200).json({ token, user });
  } catch (err) {
    console.log("Error logging in user:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token.split(" ")[1], secretKey);

    // Retrieve the user data using the decoded token information
    const user = await Elite.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user data
    res.status(200).json({ user });
  } catch (error) {
    // Log any errors that occur during user retrieval
    console.log("Error fetching user data:", error);

    // Respond with an error message
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});



// POST route to handle adding comments
app.post("/category/:categoryId/carousel/:carouselId/comments", async (req, res) => {
  try {
    const { userId, comments } = req.body;
    const { categoryId, carouselId } = req.params;

    // Find the category by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the carousel within the category by ID
    const carousel = category.movies.flatMap(movie => movie.carousel).find(carousel => carousel._id.toString() === carouselId);
    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }

    // Add each comment to the carousel
    comments.forEach(comment => {
      if (!comment.text) {
        return res.status(400).json({ message: "Comment text is required" });
      }
      carousel.comments.push({ user: userId, text: comment.text });
    });

    // Save the changes
    await category.save();

    res.status(201).json({ message: "Comments added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/homeLikes', homeLikeRoutes);
app.use('/homeComments', homeCommentRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
  console.log("server is running at port:", port);
});
