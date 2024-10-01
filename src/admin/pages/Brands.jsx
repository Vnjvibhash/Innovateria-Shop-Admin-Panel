import React, { useState, useEffect } from 'react';
import {
  getSubCategories,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from '../../apis/index.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({
    _id: '',
    name: '',
    subcategoryId: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getBrands()
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load brands');
      });
    await getSubCategories()
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load subcategories');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBrand({ ...currentBrand, [name]: value });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentBrand({ name: '', subcategoryId: '' });
    setModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentBrand(brands);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBrand(id)
        .then(() => {
          toast.success('Brand deleted successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to delete brand');
        });
    } catch (error) {
      toast.error('Error deleting brand');
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateBrand(currentBrand._id, currentBrand)
          .then(() => {
            toast.success('Brand updated successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to update brand');
          });
      } else {
        await createBrand(currentBrand)
          .then(() => {
            toast.success('Brand added successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to add brand');
          });
      }
    } catch (error) {
      toast.error('Error saving brand');
    }
    setModalOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Brand List</h3>
      </div>

      {/* Buttons Section */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success" onClick={handleAdd}>
          Add Brand
        </button>
        <button className="btn btn-info" onClick={handleRefresh}>
          Refresh
        </button>
      </div>

      {/* Table Section */}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sub-Category Name</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{brand.name}</td>
                <td>{brand.subcategoryId.name}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(brand)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(brand._id)}
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
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit Brand' : 'Add Brand'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Brand Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={currentBrand.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subcategory</label>
                  <select
                    className="form-select"
                    name="subcategoryId"
                    value={currentBrand.subcategoryId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {isEditing ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ToastContainer to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Brands;
