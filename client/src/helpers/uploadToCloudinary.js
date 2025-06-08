import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/dwfi3oxyl/image/upload`;

const uploadImageToCloudinary = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "seclob");
  formData.append("folder", "seclob_product_images");

  const response = await axios.post(url, formData);
  return response?.data;
};

export default uploadImageToCloudinary;
