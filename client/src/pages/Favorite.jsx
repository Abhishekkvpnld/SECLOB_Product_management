import { useEffect } from "react";
import { ChevronRight, Heart } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { allFavProducts_api } from "../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorite = () => {

    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);

    const fetchFavorite = async () => {
        try {
            const res = await axios.get(allFavProducts_api, { withCredentials: true });
            if (res?.data?.success) {
                setFavorites(res?.data?.data)
            }
        } catch (error) {
            console.log("Error checking favorite status:", error);
        }
    };

    useEffect(() => {
        fetchFavorite();
    }, []);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="hover:text-gray-800 cursor-pointer" onClick={() => navigate("/")}>Home</span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="hover:text-gray-800 cursor-pointer">Favorites</span>
                        <ChevronRight className="w-4 h-4" />
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>

                {favorites?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {favorites?.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product?.productId}
                            />
                        ))}
                    </div>
                ) : (

                    <div className="inset-0 flex items-center flex-col justify-center w-[100vw] h-[100vh]">
                        <Heart className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-gray-500 text-lg">You have no favorite products yet.</p>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Favorite;
