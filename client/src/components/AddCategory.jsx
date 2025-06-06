import { useState } from 'react';
import { X } from 'lucide-react';

const AddCategoryPopup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [categoryName, setCategoryName] = useState('');

    const handleAdd = () => {
        if (categoryName.trim()) {
            console.log('Adding category:', categoryName);
            // Handle add category logic here
            setCategoryName('');
            setIsOpen(false);
        }
    };

    const handleDiscard = () => {
        setCategoryName('');
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                    Show Add Category Modal
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
                    Add Category
                </h2>

                {/* Input Field */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
                        autoFocus
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
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
        </div>
    );
}


export default AddCategoryPopup;