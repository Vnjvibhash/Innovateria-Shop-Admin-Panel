import React, { useEffect, useState } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
} from '../../apis/category.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    _id: '',
    name: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load categories');
      });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentCategory({ name: '', image: '' });
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (isEditing) {
      await updateCategory(currentCategory._id, currentCategory)
        .then(() => {
          toast.success('Category updated successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to update category');
        });
    } else {
      // Add category logic
      await addCategory(currentCategory)
        .then(() => {
          toast.success('Category added successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to add category');
        });
    }
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Category List</h3>
      </div>
      {/* Buttons Section */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success" onClick={handleAdd}>
          Add Category
        </button>
        <button className="btn btn-info" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th colSpan={2} className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((e) => (
              <tr key={e._id}>
                <td>
                  {e._id.length > 5 ? `${e._id.substring(0, 5)}..` : e._id}
                </td>
                <td>
                  <img
                    src={e.image}
                    alt={e.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td>{e.name}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e._id)}
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
                  {isEditing ? 'Edit Category' : 'Add Category'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={currentCategory.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="image"
                    className="form-control"
                    name="image"
                    value={currentCategory.image}
                    onChange={handleInputChange}
                  />
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

export default Categories;
