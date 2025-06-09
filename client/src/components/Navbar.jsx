import { useState } from 'react';
import { User, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { logout_api } from '../utils/api';
import { userNotExists } from '../redux/reducers/auth';

const Navbar = ({ searchQuery, setSearchQuery }) => {

    const navigate = useNavigate();
    const user = useSelector((state) => state?.auth?.user);
    const dispatch = useDispatch();

    const [cartCount] = useState(3);


    const handleLogout = async () => {
        try {
            const res = await axios.get(logout_api, { withCredentials: true });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                dispatch(userNotExists())
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }

    return (
        <nav className="bg-gradient-to-r from-blue-900 to-blue-950 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 hidden md:block">
                        <div onClick={() => navigate("/")} className="text-white text-xl font-bold hover:text-blue-200 transition-colors">
                            TechStore
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <div className="flex bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                <input
                                    type="text"
                                    placeholder="Search any products"
                                    value={searchQuery}
                                    onChange={(e)=>setSearchQuery(e.target.value)}
                                    className="flex-1 px-3 md:px-6 py-2 md:py-3 rounded-l-full border-none outline-none text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-5 py-2 md:px-8 md:py-3 rounded-r-full font-semibold transition-all duration-200 hover:shadow-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Favorites */}
                        <button title='favorites' className="text-white cursor-pointer hover:text-blue-200 transition-colors p-2">
                            <Heart className="h-6 w-6 hover:scale-110 transition" onClick={() => navigate("/favorites")} />
                        </button>

                        {/* Sign In */}
                        <button className="flex items-center cursor-pointer space-x-2 text-white hover:text-blue-200 transition-colors">
                            <User className="h-5 w-5" />
                            {
                                user ? <span className="hidden md:inline  font-medium" onClick={handleLogout}>Logout</span> :
                                    <span className="hidden md:inline  font-medium" onClick={() => navigate("/login")}>Sign in</span>
                            }
                        </button>

                        {/* Cart */}
                        <button className="relative hidden md:flex items-center cursor-pointer space-x-2 text-white hover:text-blue-200 transition-colors">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="hidden sm:inline font-medium">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button - Hidden for now, can be expanded */}
            <div className="sm:hidden">
                {/* Mobile menu implementation can go here */}
            </div>
        </nav>
    );
}


export default Navbar;