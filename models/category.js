// const mongoose = require('mongoose');

// // Subschema for Carousel
// const carouselSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   image: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   video: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   comments: [
//     {
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         // required: true,
//       },
//       text: {
//         type: String,
//         // required: true,
//         trim: true,
//       },
//       createdAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
// });

// // Subschema for Movie
// const movieSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   title: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   poster: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   carousel: [carouselSchema], // Array of carousel subdocuments
// });

// // Main schema for Category
// const categorySchema = new mongoose.Schema({
//   id: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   title: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   name: {
//     type: String,
//     // required: true,
//     trim: true,
//   },
//   movies: [movieSchema], // Array of movie subdocuments
// });

// // Define the model
// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;

const mongoose = require("mongoose");

// Subschema for Carousel
const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  video: {
    type: String,
    required: true,
    trim: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Elite",
      },
      text: { type: String, required: true },

      createdAt: {
        type: Date,
        default: Date.now,
      },
      //   picture: {
      //     uri: String,
      //     // public_id: String,
      // },
    },
  ],
});

// Subschema for Movie
const movieSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  poster: {
    type: String,
    required: true,
    trim: true,
  },
  carousel: carouselSchema, // Single carousel subdocument
});

// Main schema for Category
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  movies: [movieSchema], // Array of movie subdocuments
});

// Define the model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
