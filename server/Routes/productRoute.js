import express from "express";

import { authToken } from "../middleware/jwtAuth.js";
import {
  addCategory,
  addProduct,
  addSubCategory,
  getAllCategories,
  getAllProducts,
  updateProduct,
} from "../controllers/product/product.js";

const router = express.Router();

router.post("/add-category", authToken, addCategory);
router.post("/add-subcategory", authToken, addSubCategory);
router.get("/all-category", authToken, getAllCategories);
router.post("/add-product", addProduct);
// router.put("/update-product", authToken, updateProduct);
// router.get("/getAll-product",getAllProducts)

export default router;
