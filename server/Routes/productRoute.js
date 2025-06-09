import express from "express";

import { authToken } from "../middleware/jwtAuth.js";
import {
  addCategory,
  addProduct,
  addSubCategory,
  allFavProducts,
  favoriteProducts,
  getAllCategories,
  getAllProducts,
  getAllSubCategories,
  toggleFavorite,
  updateProduct,
} from "../controllers/product/product.js";

const router = express.Router();

router.post("/add-category", authToken, addCategory);
router.post("/add-subcategory", authToken, addSubCategory);
router.get("/all-category", authToken, getAllCategories);
router.post("/add-product",authToken, addProduct);
router.put("/update-product/:id", authToken, updateProduct);
router.get("/getAll-product", getAllProducts);
router.get("/get-product/:id", authToken, getAllProducts);
router.post("/fav-toggle", authToken, toggleFavorite);
router.get("/fav-product", authToken, favoriteProducts);
router.get("/all-favProducts", authToken, allFavProducts);
router.get("/all-subCategory",getAllSubCategories)

export default router;
