import Navbar from "../components/Navbar";
import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import AddSubCategoryPopup from "../components/SubCategory";
import AddCategoryPopup from "../components/AddCategory";
import AddProductPopup from "../components/AddProduct";


const Home = () => {

  const [favorites, setFavorites] = useState(new Set());
  const [isLaptopOpen, setIsLaptopOpen] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);


  const products = [
    { id: 1, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
    { id: 2, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
    { id: 3, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
    { id: 4, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
    { id: 5, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
    { id: 6, name: 'HP AMD Ryzen 3', price: '$529.99', rating: 4 },
  ];

  return (
    <div>
      <Navbar />

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

              <div>
                <div
                  className="flex items-center justify-between text-sm font-medium text-gray-900 cursor-pointer hover:text-gray-700"
                  onClick={() => setIsLaptopOpen(!isLaptopOpen)}
                >
                  <span>Laptop</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isLaptopOpen ? 'rotate-180' : ''}`} />
                </div>

                {isLaptopOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
                      <span className="text-sm text-gray-600">HP</span>
                    </div>
                    <div className="text-sm text-gray-600 ml-6 hover:text-gray-800 cursor-pointer">
                      Dell
                    </div>

                    <div className="text-sm text-gray-600 ml-6 hover:text-gray-800 cursor-pointer">
                      Tablet
                    </div>
                  </div>

                )}
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Product Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} setFavorites={setFavorites} favorites={favorites} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination />

          </div>
        </div>
      </div>


      {addSubCategory && <AddSubCategoryPopup setIsOpen={setAddSubCategory} />}
      {addCategory && <AddCategoryPopup setIsOpen={setAddCategory} />}
      {addProduct && <AddProductPopup isOpen={addProduct} setIsOpen={setAddProduct} />}

    </div>

  )
}

export default Home