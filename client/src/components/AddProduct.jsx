import { useState, useEffect } from 'react';
import { X, ChevronDown, Plus, Minus } from 'lucide-react';
import uploadImageToCloudinary from '../helpers/uploadToCloudinary';
import toast from "react-hot-toast";
import { addProduct_api, allSubCategory_api, updateProduct_api } from '../utils/api';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductPopup = ({ setIsOpen, isUpdate = false, product = {}, fetchProducts }) => {


    const user = useSelector((state) => state?.auth?.user);
    const navigate = useNavigate();

    const [imageLoad, setImageLoad] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        subCategory: '',
        description: ''
    });
    const [variants, setVariants] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

    useEffect(() => {
        fetchAllSubCategory();
    }, []);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]);



    useEffect(() => {
        if (isUpdate && product) {
            setFormData({
                title: product?.productName || '',
                subCategory: product?.subCategory || '',
                description: product?.description || '',
            });
            setSelectedSubCategories(product?.subCategory || '');
            setVariants(
                isUpdate && product?.variants?.length > 0
                    ? [...product.variants]
                    : [{ ram: '', price: '', qty: 1 }]
            );
            setUploadedImages(product?.images || []);
        }
    }, [isUpdate, product]);

    useEffect(() => {
        if (variants?.length === 0) {
            setVariants([{ ram: '', price: '', qty: 1 }]);
        }
    }, []);

    const fetchAllSubCategory = async () => {
        try {
            const res = await axios.get(allSubCategory_api, { withCredentials: true });
            if (res?.data?.success) {
                setSubCategories(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleQuantityChange = (index, increment) => {
        const newVariants = [...variants];
        const currentQty = parseInt(newVariants[index].qty) || 0;
        const newQty = Math.max(0, currentQty + increment);
        newVariants[index].qty = newQty;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { ram: '', price: '', qty: 1 }]);
    };

    const removeVariant = (index) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index));
        }
    };

    const handleImageUpload = async (event) => {
        setImageLoad(true);
        const files = Array.from(event.target.files);
        for (const file of files) {
            try {
                const uploaded = await uploadImageToCloudinary(file);
                setUploadedImages((prev) => [...prev, uploaded.secure_url]);
            } catch (err) {
                toast.error("Failed to upload images...🔃");
            } finally {
                setImageLoad(false);
            }
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.subCategory || !formData.description) {
            toast.error("Please fill out all required fields.");
            return;
        }

        if (variants.length === 0 || variants.some(v => !v.ram || !v.price || v.qty <= 0)) {
            toast.error("Please ensure all variants are properly filled.");
            return;
        }

        if (uploadedImages.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        try {
            const payload = {
                ...formData,
                variants,
                images: uploadedImages,
            };

            const res = isUpdate
                ? await axios.put(`${updateProduct_api}/${product?._id}`, payload, {
                    withCredentials: true,
                })
                : await axios.post(addProduct_api, payload, {
                    withCredentials: true,
                });

            if (res?.data?.success) {
                toast.success(res.data.message || `${isUpdate ? "Updated" : "Added"} successfully!`);
                fetchProducts();
                setIsOpen(false);
            } else {
                toast.error(res.data.message || "Something went wrong.");
            }

        } catch (err) {
            console.error(`${isUpdate ? "Update" : "Add"} Product Error:`, err);
            toast.error(err?.response?.data?.message || "Server error. Try again later.");
        }
    };


    const handleDiscard = () => {
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-blue-50/80 flex items-center justify-center p-4 z-50">
            <form onSubmit={handleAdd} className="bg-white border-2 border-slate-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-6 border-b border-gray-200">
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold text-center">{isUpdate ? 'Update' : 'Add'} Product</h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title :</label>
                        <input type="text" value={formData.title} placeholder='Type Product Name...' onChange={(e) => handleInputChange('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400" />
                    </div>


                    {/* Variants */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Variants:</label>
                        {variants && variants.map((variant, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                {/* RAM input */}
                                <input
                                    type="text"
                                    value={variant.ram}
                                    onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                                    placeholder="4 GB"
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                />

                                {/* Price input */}
                                <input
                                    type="text"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                    placeholder="$529.99"
                                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                />

                                {/* Quantity controls */}
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(index, -1)}
                                    className="w-6 h-6 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>

                                <span className="w-8 text-center text-sm">{variant.qty}</span>

                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(index, 1)}
                                    className="w-6 h-6 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>

                                {/* Remove variant */}
                                {variants.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add Variant Button */}
                        <button
                            type="button"
                            onClick={addVariant}
                            className="bg-gray-800 text-white px-4 py-1 rounded text-sm hover:bg-gray-900"
                        >
                            Add variants
                        </button>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub category :</label>
                        <button type="button" onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)} className="w-full px-3 py-2 border border-gray-300 rounded-md flex items-center justify-between">
                            <span>{selectedSubCategories || "Select Subcategory"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSubCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSubCategoryOpen && (
                            <div className="mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                {subCategories?.map((category) => (
                                    <button type="button" key={category?._id} onClick={() => {
                                        handleInputChange('subCategory', category?._id);
                                        setSelectedSubCategories(category?.subCategory);
                                        setIsSubCategoryOpen(false);
                                    }} className="w-full px-3 py-2 text-left hover:bg-gray-50">
                                        {category?.subCategory}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description :</label>
                        <textarea placeholder='Type Product Description...' value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 resize-none" />
                    </div>

                    <div className='overflow-x-scroll'>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload image:</label>
                        <div className="flex items-center gap-3">
                            {uploadedImages?.map((image, index) => (
                                <div key={index} className="w-20 h-16 border-2 border-gray-300 rounded-md">
                                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {imageLoad ? (
                                <div className="w-20 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <label className="w-20 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    <Plus className="w-6 h-6 text-gray-400" />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
                    <div className="flex gap-3">
                        <button type='submit' className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600">
                            {isUpdate ? 'UPDATE' : 'ADD'}
                        </button>
                        <button type="button" onClick={handleDiscard} className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600">
                            DISCARD
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProductPopup;
