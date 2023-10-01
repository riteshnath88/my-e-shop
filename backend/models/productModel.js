const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please eneter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter prodct description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price."],
    maxLength: [8, "Price cannot exceed 8 characters."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      // We will hoist the images in the cloud. When we hoist
      // images in cloud, we get a public id and url
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  stock: {
    type: Number,
    default: 1,
    required: [true, "Please enter product stock"],
    maxLength: [4, "Stock cannot exceed 4 digits"],
  },
  noOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
