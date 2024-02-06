
// const postRouter= require('./routers/post');
// require("./db");
require('express-async-errors')
require('dotenv').config();
// const morgan = require('morgan')
// app.use(morgan('dev'));




const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const nodemailer = require("nodemailer");
// const port = 8000;
const port =process.env.PORT
const cors = require("cors");
const session = require("express-session");
// const postRouter = require("./routers/post");
const postRouter =require("./routers/post")
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
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
    "mongodb+srv://turnermarvelous:TXwJ4Zp7nAgVcRJb@cluster0.osgfdcc.mongodb.net/",
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
const Informals = require("./models/informals")
const Spirit = require("./models/spirit")
const Trending = require("./models/trend");
const Classics = require("./models/classics")
const Category = require("./models/category");
const User = require("./models/user");
const Staff = require("./models/staff");
const Order = require("./models/order");
const { Console } = require("console");
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
  // compose email message
  const mailOption = {
    from: "turnermarvelous@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: https://35d3-102-218-82-9.ngrok-free.app/${verificationToken}`,
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

app.use('/send-data', postRouter)
app.use((error,req,res,next) =>{
 res.status(500).json({error:error.message})
})





//endpoint to register in the application

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check if the email already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //check if the email already exist
    const newUser = new User({ name, email, password });
    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    //save user into data base
    await newUser.save();
    //send verification email to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (err) {
    console.log("Error registring user:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.post("/spirit", async (req, res) => {
  try {
    const { id, user, title, media, description ,image} = req.body;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.post("/send-data", (req, res) => {
//   const staff = new Staff({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     picture: req.body.picture,
//     role: req.body.role,
//   });
//   staff
//     .save()
//     .then((data) => {
//       console.log(data);
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

app.post("/trending", async (req, res) => {
  try {
    const { id, user, title, media, description ,image} = req.body;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post("/informal", async (req, res) => {
  try {
    const { id, user, title, media, description ,image} = req.body;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post("/classics", async (req, res) => {
  try {
    const { id, user, title, media, description ,image} = req.body;
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/classics", async (req, res) => {
  try {
    const data = await Classics.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/spirit", async (req, res) => {
  try {
    const data = await Spirit.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/trending", async (req, res) => {
  try {
    const data = await Trending.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/informal", async (req, res) => {
  try {
    const data = await Informals.find({});
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    });
});

app.get("/", (req, res) => {
  Staff.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update", (req, res) => {
  Staff.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    role: req.body.role,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//end point too verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
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
//ENDPOINT TO LOGIN THE USER
app.post("/LOGIN", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if the USER exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    console.log("Error LOGING IN user:", err);
    res.status(500).json({ message: "lOGIN failed" });
  }
});

app.listen(port, () => {
  console.log("server is running at port:", port);
});
