import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getVariants,
  createVariant,
  updateVariant,
  deleteVariant,
  getVariantTypes,
} from '../../apis/index.api';

const Variants = () => {
  const [variants, setVariants] = useState([]);
  const [variantTypes, setVariantTypes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({
    _id: '',
    name: '',
    variantTypeId: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getVariants();
      const typeRes = await getVariantTypes();
      setVariants(res.data);
      setVariantTypes(typeRes.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load Variants');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVariant({ ...currentVariant, [name]: value });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentVariant({ name: '', variantTypeId: '' });
    setModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCurrentVariant(variants);
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateVariant(currentVariant._id, currentVariant);
        toast.success('Variant updated successfully');
      } else {
        await createVariant(currentVariant);
        toast.success('Variant added successfully');
      }
      setModalOpen(false);
      getData();
    } catch (error) {
      console.log('Error saving variant:', error);
      toast.error('Error saving variant');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariant(id)
        .then(() => {
          toast.success('Variant deleted successfully');
          getData();
        })
        .catch(() => {
          toast.error('Failed to delete variant');
        });
    } catch (error) {
      toast.error('Error deleting variant');
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
              <th>Variant Type</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant._id}>
                <td>{variant.name}</td>
                <td>{variant.variantTypeId.name}</td>
                <td className="text-end">
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(variant)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleDelete(variant._id)}
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
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit Variant' : 'Add Variant'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                />
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
                    value={currentVariant.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="variantTypeId" className="form-label">
                    Variant Type
                  </label>
                  <select
                    className="form-select"
                    name="variantTypeId"
                    value={variants.variantTypeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Variant Type</option>
                    {variantTypes.map((variant) => (
                      <option key={variant._id} value={variant._id}>
                        {variant.name}
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
export default Variants;
