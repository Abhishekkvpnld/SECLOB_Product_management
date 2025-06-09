import Category from "../../models/categoryModel.js";
import SubCategory from "../../models/subCategory.js";
import Product from "../../models/Product.Model.js";
import Favorite from "../../models/favoriteModel.js";

// Add a new category
export const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const userId = req.user?.id;

    if (!categoryName || !userId) {
      throw new Error("Category name and user are required.");
    }

    // Check if category already exists
    const existing = await Category.findOne({ categoryName });
    if (existing) {
      throw new Error("Category already exists.");
    }

    const newCategory = await Category.create({
      categoryName,
      user: userId,
    });

    res.status(201).json({
      success: true,
      error: false,
      data: newCategory,
      message: "Category created successfully.",
    });
  } catch (error) {
    console.error("Add Category Error:", error);
    res.status(500).json({ success: false, message: error?.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      data: categories,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Failed to fetch categories",
    });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, category } = req.body;
    const userId = req.user?.id;

    if (!subCategoryName || !category || !userId) {
      throw new Error("sub category,Category name and user are required.");
    }

    // Check if sub-category already exists
    const existing = await SubCategory.findOne({
      subCategory: subCategoryName,
    });
    if (existing) {
      throw new Error("Sub-Category already exists.");
    }

    const newCategory = await SubCategory.create({
      subCategory: subCategoryName,
      user: userId,
      category: category,
    });

    res.status(201).json({
      success: true,
      error: false,
      data: newCategory,
      message: "sub category created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      data: [],
      message: error?.message,
    });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { title, subCategory, description, variants, images } = req.body;
    const userId = req?.user?.id;

    if (!userId) throw new Error("Please login first...");

    // Validation
    if (!title || !subCategory || !description || !variants) {
      throw new Error("Missing required fields.");
    }

    //Images
    if (images.length === 0) {
      throw new Error("Please upload product image");
    }

    const formattedVariants = variants.map((el) => ({
      ram: el?.ram,
      price: parseInt(el?.price),
      qty: parseInt(el?.qty),
    }));

    const subCategoryCheck = await SubCategory.findById(subCategory);

    if (!subCategoryCheck) throw new Error("Sub category not found...");

    const newProduct = new Product({
      productName: title,
      subCategory: subCategoryCheck?._id,
      description,
      variants: formattedVariants,
      images: images || [],
      user: userId,
      category: subCategoryCheck?.category,
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully.",
      product: newProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: error?.message, success: false, error: true });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subCategory, description, variants, images } = req.body;
    const userId = req?.user?.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product ID is required.",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found.",
      });
    }

    //  Check ownership if needed
    if (product?.user?.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: true,
        message: "You are not authorized to update this product.",
      });
    }

    // Update only fields that are sent
    if (title !== undefined) product.title = title;
    if (subCategory !== undefined) product.subCategory = subCategory;
    if (description !== undefined) product.description = description;
    if (Array.isArray(variants)) product.variants = variants;
    if (Array.isArray(images)) product.images = images;
    if (userId) product.user = userId;

    await product.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "Product updated successfully ✅",
      data: product,
    });
  } catch (error) {
    console.error("Product update error:", error.message);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "All products fetched successfully.",
      data: products,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) throw new Error("Product not found...");

    const product = await Product.findById(productId);

    if (!product) throw new Error("product not found...❌");

    res.status(200).json({
      message: "All products fetched successfully.",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
      success: false,
      error: true,
    });
  }
};

// Toggle favorite product for a user
export const toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req?.user?.id;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "UserId and ProductId are required." });
    }

    // Check if this favorite already exists
    const existing = await Favorite.findOne({ userId, productId });

    if (existing) {
      // If exists, remove (unfavorite)
      await Favorite.findOneAndDelete({ productId, userId });
      return res.status(200).json({
        message: "Removed from favorites",
        success: true,
        error: false,
      });
    }

    // If not exists, add to favorites
    const newFavorite = new Favorite({ userId, productId });
    await newFavorite.save();

    const allFavProducts = await Favorite.find({ userId });

    res.status(201).json({
      message: "Added to favorites",
      success: true,
      error: false,
      data: allFavProducts,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res
      .status(500)
      .json({ message: "Server Error", success: true, error: false });
  }
};

export const favoriteProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "Please login first..." });
    }

    const allFavProducts = await Favorite.find({ userId });

    res.status(200).json({
      message: "Added to favorites",
      success: true,
      error: false,
      data: allFavProducts,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res
      .status(500)
      .json({ message: "Server Error", success: true, error: false });
  }
};

export const allFavProducts = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login first...",
        success: false,
        error: true,
      });
    }

    const allFavProducts = await Favorite.find({ userId }).populate(
      "productId"
    );

    res.status(200).json({
      message: "Favorite products fetched successfully",
      success: true,
      error: false,
      data: allFavProducts,
    });
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    res
      .status(500)
      .json({ message: "Server Error", success: false, error: true });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate(
      "category",
      "categoryName"
    );

    res.status(200).json({
      success: true,
      error: false,
      message: "Fetched all subcategories",
      data: subCategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      error: true,
      success: false,
      message: "Server error while fetching subcategories",
    });
  }
};
