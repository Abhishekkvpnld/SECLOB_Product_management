import { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';

const ProductDescription = () => {
  const [selectedRam, setSelectedRam] = useState('4 GB');
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  const ramOptions = ['4 GB', '8 GB', '16 GB'];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-gray-800 cursor-pointer">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-gray-800 cursor-pointer">Product details</span>
            <ChevronRight className="w-4 h-4" />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 aspect-square flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-60 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-lg transform -rotate-12 shadow-2xl">
                  <div className="absolute inset-2 bg-black rounded opacity-90"></div>
                  <div className="absolute inset-3 bg-gradient-to-br from-blue-300 to-blue-500 rounded"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-80 h-8 bg-gray-300 rounded-full transform rotate-12 shadow-lg"></div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 w-24 h-24 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <div className="w-16 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded transform -rotate-6"></div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 w-24 h-24 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <div className="w-16 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded transform rotate-6"></div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">HP AMD Ryzen 3</h1>
              <div className="text-3xl font-bold text-gray-900 mb-4">$529.99</div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-600">Availability:</span>
                <span className="text-green-600 font-medium flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  In stock
                </span>
              </div>

              <p className="text-orange-600 text-sm font-medium">
                Hurry up! only 34 product left in stock!
              </p>
            </div>

            {/* RAM Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">Ram:</label>
              <div className="flex space-x-2">
                {ramOptions.map((ram) => (
                  <button
                    key={ram}
                    onClick={() => setSelectedRam(ram)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${selectedRam === ram
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                  >
                    {ram}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">Quantity:</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                Edit product
              </button>
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                Buy it now
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`p-3 border rounded-full transition-colors ${isFavorited
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDescription;