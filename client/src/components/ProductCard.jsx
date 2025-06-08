import axios from 'axios';
import { Heart, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { favoriteToggle_api } from '../utils/api';

const ProductCard = ({ favorites, product, setFavorites }) => {

    const navigate = useNavigate();

    //Toggle Favorites list handler
    const toggleFavorite = async (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        
        setFavorites(newFavorites);
        try {
            const res = await axios.post(favoriteToggle_api, { productId }, { withCredentials: true })
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };


    //Star rating
    const StarRating = ({ rating = 4 }) => (
        <div className="flex space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4  ${star <= rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
                        }`}
                />
            ))}
        </div>
    );



    const ImageIcon = () => (
        <div className="w-full h-32 flex items-center justify-center mb-3">
            <img
                src={product?.images[0] && product?.images[0]}
                alt="Product Icon"
                className="w-24 h-24 object-contain"
            />
        </div>
    );


    return (
        <div onClick={() => navigate(`/description/${product?._id}`)} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="relative">
                <ImageIcon />
                <button
                    onClick={() => toggleFavorite(product?._id)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <Heart
                        className={`w-5 h-5 ${favorites?.has(product?._id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                            }`}
                    />
                </button>
            </div>

            <h3 className="font-medium text-gray-900 mb-1">{product?.productName}</h3>
            <div className="text-lg font-bold text-gray-900 mb-2">{product?.varients?.price}</div>
            <StarRating rating={product.rating} />
        </div>
    )
}

export default ProductCard;