import Category from "../../models/categoryModel.js";
import SubCategory from "../../models/subCategory.js";
import Product from "../../models/Product.Model.js";

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
    const userID = req?.user?.id;

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
      user: userID,
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
    const { productId } = req.params;
    const { title, subCategory, description, variants, images } = req.body;
    const userId = req?.user?.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Product not found",
      });
    }

    // Update fields
    if (title) product.title = title;
    if (subCategory) product.subCategory = subCategory;
    if (description) product.description = description;
    if (variants && Array.isArray(variants)) product.variants = variants;
    if (images && Array.isArray(images)) product.images = images;
    if (userId) product.user = userId;
    if (product.category) product.category = product.category;

    await product.save();

    res.status(200).json({
      success: true,
      error: false,
      message: "Product data updated successfully...✅",
      data: product,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: true,
      success: false,
      data: [],
      message: error?.message || "Internal server error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      message: "All products fetched successfully.",
      products,
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
