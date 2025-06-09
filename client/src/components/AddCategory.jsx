import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { addCategory_api } from '../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddCategoryPopup = ({ setIsOpen }) => {

     const user = useSelector((state) => state.auth.user);
    const [categoryName, setCategoryName] = useState('');
     const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            if (categoryName.trim()) {
                const res = await axios.post(addCategory_api, { categoryName }, { withCredentials: true });
                if (res?.data?.success) {
                    setCategoryName('');
                    setIsOpen(false);
                    toast.success(res?.data?.message)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    const handleDiscard = () => {
        setCategoryName('');
        setIsOpen(false);
    };


        useEffect(() => {
            if (!user) {
                return navigate("/login");
            }
        }, [user, navigate]);
    


    return (
        <div className="fixed inset-0 bg-blue-50/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={handleDiscard}
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