const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Auth Api
export const login_api = `${BASE_URL}/user/login`;
export const signup_api = `${BASE_URL}/user/signup`;
export const logout_api = `${BASE_URL}/user/logout`;
export const getUser_api = `${BASE_URL}/user/me`;

//Product Api
export const addCategory_api = `${BASE_URL}/product/add-category`;
export const allCategory_api = `${BASE_URL}/product/all-category`;
export const addSubCategory_api = `${BASE_URL}/product/add-subcategory`;
export const addProduct_api = `${BASE_URL}/product/add-product`;
export const updateProduct_api = `${BASE_URL}/product/update-product`;
export const fetchAllProduct_api = `${BASE_URL}/product/getAll-product`;
