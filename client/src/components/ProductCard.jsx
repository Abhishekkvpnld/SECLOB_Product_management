import { Heart,Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ favorites, product, setFavorites }) => {

    const navigate = useNavigate();


    //Toggle Favorites list handler
    const toggleFavorite = (productId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(productId)) {
            newFavorites.delete(productId);
        } else {
            newFavorites.add(productId);
        }
        setFavorites(newFavorites);
    };


    //Star rating
    const StarRating = ({ rating }) => (
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



    const LaptopIcon = () => (
        <div className="w-full h-32 flex items-center justify-center mb-3">
            <div className="relative">
                <div className="w-24 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded transform -rotate-6 shadow-lg">
                    <div className="absolute inset-1 bg-black rounded opacity-90"></div>
                    <div className="absolute inset-1.5 bg-gradient-to-br from-blue-300 to-blue-500 rounded"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-24 h-2 bg-gray-300 rounded-full transform rotate-6 shadow-sm"></div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="relative">
                <LaptopIcon />
                <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <Heart
                        className={`w-5 h-5 ${favorites.has(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                            }`}
                    />
                </button>
            </div>

            <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
            <div className="text-lg font-bold text-gray-900 mb-2">{product.price}</div>
            <StarRating rating={product.rating} />
        </div>
    )
}

export default ProductCard;