import React, { useState, useEffect } from 'react';
import {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategories,
} from '../../apis/index.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState({
    _id: '',
    name: '',
    categoryId: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getSubCategories()
      .then((res) => {
        setSubCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load subCategories');
      });
    await getCategories()
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load Category');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubCategory({ ...currentSubCategory, [name]: value });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentSubCategory({ name: '', categoryId: '' });
    setModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentSubCategory(subCategories);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id)
        .then(() => {
          toast.success('subCategory deleted successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to delete subCategory');
        });
    } catch (error) {
      toast.error('Error deleting subCategory');
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateSubCategory(currentSubCategory._id, currentSubCategory)
          .then(() => {
            toast.success('subCategory updated successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to update subCategory');
          });
      } else {
        await createSubCategory(currentSubCategory)
          .then(() => {
            toast.success('subCategory added successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to add subCategory');
          });
      }
    } catch (error) {
      toast.error('Error saving subCategory');
    }
    setModalOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>subCategory List</h3>
      </div>

      {/* Buttons Section */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success" onClick={handleAdd}>
          Add subCategory
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
              <th>Category Name</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory._id}>
                <td>{subCategory._id}</td>
                <td>{subCategory.name}</td>
                <td>{subCategory.categoryId.name}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(subCategory)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(subCategory._id)}
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
                  {isEditing ? 'Edit subCategory' : 'Add subCategory'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">subCategory Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={currentSubCategory.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="categoryId"
                    value={currentSubCategory.categoryId}
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
                  {isEditing ? 'Save Changes' : 'Add Sub Category'}
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

export default SubCategories;
