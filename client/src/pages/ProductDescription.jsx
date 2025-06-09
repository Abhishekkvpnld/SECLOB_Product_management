import { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { favoriteProduct_api, favoriteToggle_api, getProduct_api } from '../utils/api';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import AddProductPopup from '../components/AddProduct';

const ProductDescription = () => {


  const navigate = useNavigate();
  const { id: productId } = useParams();
  const user = useSelector((state) => state?.auth?.user)


  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imgIndex, setImgIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState({});
  const [updateProduct, setUpdateProduct] = useState(false)


  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);


  const toggleFavorite = async () => {
    try {
      const res = await axios.post(
        favoriteToggle_api,
        { productId: product[0]?._id },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        if (res?.data?.data && res?.data?.data.length > 0) {
          const isFav = res.data.data.some(
            (el) =>
              el?.userId === user?._id && el?.productId === product[0]?._id
          );
          setIsFavorited(isFav);
        } else {
          setIsFavorited(false);
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update favorites");
    }
  };




  const checkFavoriteStatus = async () => {
    try {
      const res = await axios.get(favoriteProduct_api, { withCredentials: true });
      if (res?.data?.success) {
        const isFav = res?.data?.data?.some(
          (el) => el?.userId === user?._id && el?.productId === product[0]?._id
        );
        setIsFavorited(isFav);
      }
    } catch (error) {
      console.log("Error checking favorite status:", error);
    }
  };


  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${getProduct_api}/${productId}`, { withCredentials: true });
      if (res?.data?.success) {
        setProduct(res?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (product[0]?._id && user?._id) {
      checkFavoriteStatus();
    }
  }, [product, user]);


  useEffect(() => {
    setSelectedVariant(product[0]?.variants[0])
  }, []);


  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);


  return (
    <div className="min-h-screen bg-gray-50">


      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="hover:text-gray-800 cursor-pointer" onClick={() => navigate("/")}>Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-gray-800 cursor-pointer">Product details</span>
            <ChevronRight className="w-4 h-4" />
          </nav>
        </div>
      </div>



      {/* Main Content */}
      <div className=" mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 aspect-square flex items-center justify-center max-w-[90%]">
              <img
                src={product[0]?.images[imgIndex]}
                alt="img"
                className="max-w-[80%] max-h-[80%] object-cover rounded-lg  transform bg-blend-multiply"
              />
            </div>



            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-scroll hide-scrollbar">
              {product[0]?.images?.map((img, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 p-4 w-24 h-24 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors overflow-x-scroll hide-scrollbar"
                >
                  <img
                    src={img}
                    onClick={() => setImgIndex(index)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-12 object-cover rounded transform"
                  />
                </div>
              ))}
            </div>


          </div>



          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product[0]?.productName}</h1>
              {selectedVariant && <div className="text-3xl font-bold text-gray-900 mb-4">${selectedVariant?.price}.00</div>}

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
                {product[0]?.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${selectedVariant?.ram === variant?.ram
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                  >
                    {variant?.ram}
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
            <div className="flex space-x-1 md:space-x-4 pt-4">
              <button onClick={() => setUpdateProduct((prev) => !updateProduct)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 md:py-3 px-4 md:px-6 rounded-full transition-colors">
                Edit product
              </button>
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 md:py-3 px-4 md:px-6 rounded-full transition-colors">
                Buy it now
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-3 border cursor-pointer rounded-full transition-colors ${isFavorited
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


      {updateProduct && <AddProductPopup isOpen={updateProduct} product={product[0]} isUpdate={true} setIsOpen={setUpdateProduct} />}
    </div>
  );
}
export default ProductDescription;