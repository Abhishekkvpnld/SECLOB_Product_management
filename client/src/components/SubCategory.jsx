import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const AddSubCategoryPopup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Sample categories - replace with your actual categories
    const categories = [
        'Laptop',
        'Desktop',
        'Tablet',
        'Smartphone',
        'Accessories',
        'Headphones'
    ];

    const handleAdd = () => {
        if (selectedCategory && subCategoryName.trim()) {
            console.log('Adding sub-category:', {
                category: selectedCategory,
                subCategory: subCategoryName
            });
            // Handle add sub-category logic here
            setSelectedCategory('');
            setSubCategoryName('');
            setIsOpen(false);
        }
    };

    const handleDiscard = () => {
        setSelectedCategory('');
        setSubCategoryName('');
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    if (!isOpen) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                    Show Add Sub Category Modal
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Add Sub Category
                </h2>

                {/* Category Dropdown */}
                <div className="mb-4 relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-left bg-white flex items-center justify-between"
                    >
                        <span className={selectedCategory ? 'text-gray-700' : 'text-gray-500'}>
                            {selectedCategory || 'Select category'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sub Category Input Field */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                        placeholder="Enter sub category name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        disabled={!selectedCategory || !subCategoryName.trim()}
                        className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        ADD
                    </button>
                    <button
                        onClick={handleDiscard}
                        className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                    >
                        DISCARD
                    </button>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    );
}

export default AddSubCategoryPopup;