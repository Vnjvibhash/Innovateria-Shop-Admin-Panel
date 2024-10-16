import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getSubCategoriesByCategory,
  getBrands,
  getVariantTypes,
  getVariants,
} from '../../apis/index.api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [variantType, setVariantType] = useState([]);
  const [variant, setVariant] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    offerPrice: 0,
    proCategoryId: '',
    proSubCategoryId: '',
    proBrandId: '',
    proVariantTypeId: '',
    proVariantId: [],
    images: ['', '', '', '', ''],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      const resCategory = await getCategories();
      const resBrand = await getBrands();
      const resVariantType = await getVariantTypes();
      const resVariant = await getVariants();
      setProducts(res.data);
      setCategory(resCategory.data);
      setBrand(resBrand.data);
      setVariantType(resVariantType.data);
      setVariant(resVariant.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products');
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });

    // Fetch subcategories when a category is selected
    if (name === 'proCategoryId' && value) {
      try {
        const resSubCategory = await getSubCategoriesByCategory(value);
        setSubCategory(resSubCategory.data);
        setCurrentProduct((prev) => ({ ...prev, proSubCategoryId: '' })); // Reset sub-category selection
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        toast.error('Failed to load subcategories');
      }
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...currentProduct.images];
    updatedImages[index] = value;
    setCurrentProduct({ ...currentProduct, images: updatedImages });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0,
      offerPrice: 0,
      proCategoryId: '',
      proSubCategoryId: '',
      proBrandId: '',
      proVariantTypeId: '',
      proVariantId: [],
      images: ['', '', '', '', ''],
    });
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateProduct(currentProduct._id, currentProduct);
        toast.success('Product updated successfully');
      } else {
        await createProduct(currentProduct);
        toast.success('Product added successfully');
      }
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Error saving product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Product List</h3>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success" onClick={handleAdd}>
          Add
        </button>
        <button className="btn btn-info" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Offer Price</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.offerPrice}</td>
                <td>{product.proCategoryId?.name}</td>
                <td>{product.proSubCategoryId?.name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit Product' : 'Add Product'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                />
              </div>
              <div className="modal-body">
                {/* Product Info Fields */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={currentProduct.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={currentProduct.quantity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="offerPrice" className="form-label">
                    Offer Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="offerPrice"
                    name="offerPrice"
                    value={currentProduct.offerPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="proCategoryId"
                    value={currentProduct.proCategoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    {category.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Sub Category</label>
                  <select
                    className="form-select"
                    name="proSubCategoryId"
                    value={currentProduct.proSubCategoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategory.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Add more fields for other product properties */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Products;

