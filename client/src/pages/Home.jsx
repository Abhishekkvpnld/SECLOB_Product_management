import Navbar from "../components/Navbar";
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import AddSubCategoryPopup from "../components/SubCategory";
import AddCategoryPopup from "../components/AddCategory";
import AddProductPopup from "../components/AddProduct";
import axios from "axios";
import { allSubCategory_api, fetchAllProduct_api } from "../utils/api";
import { useEffect } from "react";


const Home = () => {

  const [favorites, setFavorites] = useState(new Set());
  const [openCategories, setOpenCategories] = useState({});
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedList, setUpdatedList] = useState(allProducts);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSubCategory, setActiveSubCategory] = useState(null);




  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(fetchAllProduct_api, { withCredentials: true });
      if (res?.data?.success) {
        setAllProducts(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  };


  const groupByCategory = (subCategories) => {
    const grouped = {};

    subCategories.forEach((sub) => {
      const catId = sub.category._id;
      const catName = sub.category.categoryName;

      if (!grouped[catId]) {
        grouped[catId] = {
          categoryId: catId,
          categoryName: catName,
          subCategories: [],
        };
      }

      grouped[catId].subCategories.push({
        _id: sub._id,
        subCategory: sub.subCategory,
      });
    });

    return Object.values(grouped);
  };



  const fetchAllSubCategory = async () => {
    try {
      const res = await axios.get(allSubCategory_api, { withCredentials: true });
      if (res?.data?.success) {
        let grouped = groupByCategory(res?.data?.data);
        setGroupedCategories(grouped);

      }
    } catch (error) {
      console.log(error)
    }
  };


  const toggleCategory = (categoryId) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };



  const handleSubCategoryClick = (subCategoryId, categoryId) => {
    const isSameClick = activeSubCategory === subCategoryId;

    if (isSameClick) {
      // Deselect and show all products
      setActiveSubCategory(null);
      setUpdatedList(allProducts);
    } else {
      // Select and show filtered products
      const filtered = allProducts?.filter(
        (product) =>
          product?.subCategory === subCategoryId &&
          product?.category === categoryId
      );
      setActiveSubCategory(subCategoryId);
      setUpdatedList(filtered || []);
    }
  };



  useEffect(() => {
    fetchAllProducts();
    fetchAllSubCategory();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const searchProducts = allProducts.filter((product) =>
        product?.productName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUpdatedList(searchProducts);
    } else {
      setUpdatedList(allProducts);
    }
  }, [searchQuery, allProducts]);


  const pageSize = 6;
  const totalPages = Math.ceil(updatedList?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white ">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="hover:text-gray-800 cursor-pointer">Home</span>
              <ChevronRight className="w-4 h-4" />
            </nav>

            <div className="flex space-x-2">

              <button onClick={() => setAddCategory(prev => !prev)} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Add category
              </button>

              <button onClick={() => setAddSubCategory(prev => !prev)} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Add sub category
              </button>

              <button onClick={() => setAddProduct(prev => !prev)} className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                Add product
              </button>

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg border border-gray-200 p-4 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>

            <div className="space-y-2">
              <div className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                All Categories
              </div>

              {groupedCategories?.map((el, index) => (
                <div key={index}>
                  <div
                    className="flex items-center justify-between text-sm font-medium text-gray-900 cursor-pointer hover:text-gray-700"
                    onClick={() => toggleCategory(el?.categoryId)}
                  >
                    <span>{el?.categoryName}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openCategories[el.categoryId] ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {openCategories[el?.categoryId] && (
                    <div className="ml-4 mt-2 space-y-2">
                      {el?.subCategories?.map((sub, i) => (
                        <div
                          key={i}
                          onClick={() => handleSubCategoryClick(sub?._id, el?.categoryId)}
                          className={`flex items-center space-x-2 cursor-pointer hover:text-gray-800`}
                        >
                          <div className={`w-4 h-4 bg-gray-800 rounded-sm ${activeSubCategory == sub?._id ? "bg-red-600" : ""} `}></div>
                          <span className="text-sm text-gray-600">{sub?.subCategory}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}



            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {updatedList?.slice(startIndex, endIndex).map((product) => (
                <ProductCard product={product} key={product._id} setFavorites={setFavorites} favorites={favorites} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />

          </div>
        </div>
      </div>



      {/* Popup windows */}
      {addSubCategory && <AddSubCategoryPopup setIsOpen={setAddSubCategory} />}
      {addCategory && <AddCategoryPopup setIsOpen={setAddCategory} />}
      {addProduct && <AddProductPopup isOpen={addProduct} setIsOpen={setAddProduct} fetchProducts={() => fetchAllProducts()} />}

    </div>

  )
}

export default Home