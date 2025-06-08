import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

export default mongoose.model("Favorite", favoriteSchema);
