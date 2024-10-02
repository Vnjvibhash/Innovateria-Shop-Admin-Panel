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
    imageUrl: ''
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getPosters()
      .then((res) => {
        setPosters(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to load posters');
      });
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updatePoster(currentPoster._id, currentPoster)
          .then(() => {
            toast.success('Poster updated successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to update poster');
          });
      } else {
        await createPoster(currentPoster)
          .then(() => {
            toast.success('Poster added successfully');
            getData();
          })
          .catch(() => {
            toast.error('Failed to add poster');
          });
      }
      setModalOpen(false);
    } catch (error) {
      console.log('Error saving poster:', error);
      toast.error('Error saving poster');
    }
  };

  const handleInputChange = (e) => {
    setCurrentPoster({
      ...currentPoster,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    setModalOpen(true);
    setIsEditing(false);
    setCurrentPoster({
      _id: '',
      posterName: '',
      imageUrl: ''
    });
  };

  const handleEdit = (poster) => {
    setModalOpen(true);
    setIsEditing(true);
    setCurrentPoster(poster);
  };

  const handleDelete = async (posterId) => {
    await deletePoster(posterId)
      .then(() => {
        toast.success('Poster deleted successfully');
        getData();
      })
      .catch(() => {
        toast.error('Failed to delete poster');
      });
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
        <button className="btn btn-success" onClick={handleRefresh}>
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
                <td>{poster.imageUrl}</td>
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
        <div
          className="modal fade"
          id="posterModal"
          tabIndex="-1"
          aria-labelledby="posterModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="posterModalLabel">
                  {isEditing ? 'Edit Poster' : 'Add Poster'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                >
                  {' '}
                </button>
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
