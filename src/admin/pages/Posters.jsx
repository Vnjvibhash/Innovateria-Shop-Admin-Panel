import React, { useState, useEffect } from 'react';
import {
  getPosters,
  createPoster,
  updatePoster,
  deletePoster,
} from '../../apis/index.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posters = () => {
  const [posters, setPosters] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPoster, setCurrentPoster] = useState({
    _id: '',
    posterName: '',
    imageUrl: '',
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await getPosters();
      setPosters(res.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load posters');
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updatePoster(currentPoster._id, currentPoster);
        toast.success('Poster updated successfully');
      } else {
        await createPoster(currentPoster);
        toast.success('Poster added successfully');
      }
      setModalOpen(false);
      getData();
    } catch (error) {
      console.log('Error saving poster:', error);
      toast.error('Error saving poster');
    }
  };

  const handleInputChange = (e) => {
    setCurrentPoster({
      ...currentPoster,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentPoster({
      _id: '',
      posterName: '',
      imageUrl: '',
    });
    setModalOpen(true);
  };

  const handleEdit = (poster) => {
    setIsEditing(true);
    setCurrentPoster(poster);
    setModalOpen(true);
  };

  const handleDelete = async (posterId) => {
    try {
      await deletePoster(posterId);
      toast.success('Poster deleted successfully');
      getData();
    } catch (error) {
      toast.error('Failed to delete poster');
    }
  };

  const handleRefresh = () => {
    getData();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Posters List</h3>
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
              <th>Poster Name</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posters.map((poster) => (
              <tr key={poster._id}>
                <td>{poster.posterName}</td>
                <td>
                  <img
                    src={poster.imageUrl}
                    alt={poster.posterName}
                    style={{
                      width: '100px',
                      height: '100px',
                      padding: '20px',
                      borderRadius: '20%',
                      objectFit: 'cover',
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEdit(poster)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(poster._id)}
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
                  {isEditing ? 'Edit Poster' : 'Add Poster'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="posterName" className="form-label">
                    Poster Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="posterName"
                    name="posterName"
                    value={currentPoster.posterName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={currentPoster.imageUrl}
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
                  {isEditing ? 'Save Changes' : 'Add Poster'}
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

export default Posters;
