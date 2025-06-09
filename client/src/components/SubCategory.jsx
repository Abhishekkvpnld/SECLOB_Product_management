import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { addSubCategory_api, allCategory_api } from '../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AddSubCategoryPopup = ({ setIsOpen }) => {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const user = useSelector((state) => state.auth.user);



    const fetchCategory = async () => {
        try {
            const res = await axios.get(allCategory_api, { withCredentials: true });
            if (res?.data?.success) {
                setCategories(res?.data?.data);
            }
        } catch (error) {
            toast.error("Error fetching categories...");
        }
    };


    const handleCategorySelect = (value) => {
        setSelectedCategory(value);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (selectedCategory && subCategoryName.trim()) {
                const categoryId = categories.find(
                    (el) => el?.categoryName === selectedCategory
                )?._id;

                const res = await axios.post(
                    addSubCategory_api,
                    { subCategoryName, category: categoryId },
                    { withCredentials: true }
                );

                if (res?.data?.success) {
                    setSelectedCategory('');
                    setSubCategoryName('');
                    setIsOpen(false);
                    toast.success(res?.data?.message);
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };

    const handleDiscard = () => {
        setSelectedCategory('');
        setSubCategoryName('');
        setIsOpen(false);
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    useEffect(() => {
        if (!user) {
            return navigate("/login");
        }
    }, [user, navigate]);



    return (
        <div className="fixed inset-0 bg-blue-50/80 flex items-center justify-center p-4 z-50">
            <form
                onSubmit={handleAdd}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleDiscard}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Add Sub Category
                </h2>

                {/* Category Dropdown */}
                <div className="mb-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className="w-full capitalize px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 bg-white"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {categories?.map((category) => (
                            <option
                                className="capitalize"
                                key={category?._id}
                                value={category?.categoryName}
                            >
                                {category?.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sub Category Input Field */}
                <div className="mb-6">
                    <input
                        required
                        type="text"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                        placeholder="Enter sub category name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={!selectedCategory || !subCategoryName.trim()}
                        className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        ADD
                    </button>
                    <button
                        type="button"
                        onClick={handleDiscard}
                        className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                    >
                        DISCARD
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSubCategoryPopup;