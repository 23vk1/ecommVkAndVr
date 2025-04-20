import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  specifications: {
    type: Object,
    default: {},
  },
  images: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
  deleted_at: Date,
});

productSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
