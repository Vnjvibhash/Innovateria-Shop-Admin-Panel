import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getVariantTypes,
  createVariantType,
  updateVariantType,
  deleteVariantType,
} from '../../apis/index.api';

const VariantTypes = () => {
  const [variantTypes, setVariantTypes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVariantTypes, setCurrentVariantTypes] = useState({
    _id: '',
    name: '',
    type: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getVariantTypes();
      setVariantTypes(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Fieled to load VariantTypes');
    }
  };

  const handleInputChange = (e) => {
    setCurrentVariantTypes({
      ...currentVariantTypes,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentVariantTypes({ name: '', type: '' });
    setModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentVariantTypes(variantTypes);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateVariantType(currentVariantTypes._id, currentVariantTypes);
        toast.success('Variant Type updated successfully');
      } else {
        await createVariantType(currentVariantTypes);
        toast.success('Variant Type added successfully');
      }
      setModalOpen(false);
      getData();
    } catch (error) {
      console.log('Error saving Variant Type:', error);
      toast.error('Error saving Variant Type');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariantType(id)
        .then(() => {
          toast.success('Variant Type deleted successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to delete Variant Type');
        });
    } catch (error) {
      toast.error('Error deleting Variant Type');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>List</h3>
      </div>
      {/* Buttons Section */}
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
              <th>Type</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variantTypes.map((variantType) => (
              <tr key={variantType._id}>
                <td>{variantType.name}</td>
                <td>{variantType.type}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(variantType)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleDelete(variantType._id)}
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
        <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit Variant Type' : 'Add Variant Type'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentVariantTypes.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={currentVariantTypes.type}
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
                  Save
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

export default VariantTypes;
