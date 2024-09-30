import { loginUser, getUsers, updateUser, addUser, deleteUser, logoutUser } from "./user.api";
import { getBrands } from "./brand.api";
import { getCategories, addCategory, updateCategory, deleteCategory } from "./category.api";
import { getSubcategories } from "./subCategory.api";
import { getCoupons } from "./coupon.api";
import { getPosters } from "./poster.api";
import { getProducts } from "./product.api";
import { getVariantTypes } from './variantType.api';
import { getVariants } from "./variant.api";

export {
  loginUser,
  getUsers,
  updateUser,
  addUser,
  deleteUser,
  logoutUser,
  getBrands,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getSubcategories,
  getCoupons,
  getPosters,
  getProducts,
  getVariantTypes,
  getVariants,
};