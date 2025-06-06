import { useState } from 'react';
import { Search, User, ShoppingCart, Heart } from 'lucide-react';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount] = useState(3);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" className="text-white text-xl font-bold hover:text-blue-200 transition-colors">
                            TechStore
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <div className="flex bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                <input
                                    type="text"
                                    placeholder="Search any things"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                                    className="flex-1 px-6 py-3 rounded-l-full border-none outline-none text-gray-700 placeholder-gray-400"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3 rounded-r-full font-semibold transition-all duration-200 hover:shadow-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Favorites */}
                        <button className="text-white hover:text-blue-200 transition-colors p-2">
                            <Heart className="h-6 w-6" />
                        </button>

                        {/* Sign In */}
                        <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
                            <User className="h-5 w-5" />
                            <span className="hidden sm:inline font-medium">Sign in</span>
                        </button>

                        {/* Cart */}
                        <button className="relative flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
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