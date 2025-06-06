import { useState } from 'react';
import { X, ChevronDown, Plus, Minus, Upload } from 'lucide-react';

const AddProductPopup = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        title: 'HP AMD Ryzen 3',
        subCategory: 'HP',
        description: 'The Ryzen 7 is a more high-end processor that compares to the Int...'
    });

    const [variants, setVariants] = useState([
        { ram: '4 GB', price: '529.99', qty: 1 },
        { ram: '8 GB', price: '929.99', qty: 3 }
    ]);

    const [uploadedImages, setUploadedImages] = useState([
        '/api/placeholder/80/60', // Placeholder for laptop image 1
        '/api/placeholder/80/60'  // Placeholder for laptop image 2
    ]);

    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

    const subCategories = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Apple'];

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

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImages(prev => [...prev, e.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleAdd = () => {
        console.log('Adding product:', { ...formData, variants, images: uploadedImages });
        setIsOpen(false);
    };

    const handleDiscard = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                    Show Add Product Modal
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white p-6 border-b border-gray-200">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800 text-center">Add Product</h2>
                </div>

                <div className="p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title :</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        />
                    </div>

                    {/* Variants */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Variants :</label>
                        {variants.map((variant, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Ram:</span>
                                    <input
                                        type="text"
                                        value={variant.ram}
                                        onChange={(e) => handleVariantChange(index, 'ram', e.target.value)}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="4 GB"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Price:</span>
                                    <input
                                        type="text"
                                        value={variant.price}
                                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                        className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                        placeholder="$529.99"
                                    />
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-gray-600">Qty:</span>
                                    <button
                                        onClick={() => handleQuantityChange(index, -1)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="w-8 text-center text-sm">{variant.qty}</span>
                                    <button
                                        onClick={() => handleQuantityChange(index, 1)}
                                        className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-sm hover:bg-gray-50"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                                {variants.length > 1 && (
                                    <button
                                        onClick={() => removeVariant(index)}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={addVariant}
                            className="bg-gray-800 text-white px-4 py-1 rounded text-sm hover:bg-gray-900 transition-colors"
                        >
                            Add variants
                        </button>
                    </div>

                    {/* Sub Category */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub category :</label>
                        <button
                            onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-left bg-white flex items-center justify-between focus:ring-2 focus:ring-orange-400"
                        >
                            <span>{formData.subCategory}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isSubCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSubCategoryOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                {subCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            handleInputChange('subCategory', category);
                                            setIsSubCategoryOpen(false);
                                        }}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description :</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Upload Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload image:</label>
                        <div className="flex items-center gap-3">
                            {uploadedImages.map((image, index) => (
                                <div key={index} className="w-20 h-16 border-2 border-gray-300 rounded-md overflow-hidden">
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                            <label className="w-20 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Plus className="w-6 h-6 text-gray-400" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
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
        </div>
    );
}

export default AddProductPopup; 