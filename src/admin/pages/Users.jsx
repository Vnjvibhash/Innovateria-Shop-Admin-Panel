import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUser, addUser, deleteUser } from '../../apis/user.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    role: '',
    status: true,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userResponse = await getUsers();
      setUsers(userResponse.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load users');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      address: user.address || {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      role: user.role,
      status: user.status,
    });
    setCurrentUser(user);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      _id: '',
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
      },
      role: '',
      status: true,
    });
    setCurrentUser(null);
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteUser(_id);
      setUsers(users.filter((user) => user._id !== _id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(currentUser._id, formData);
        setUsers(
          users.map((user) => (user._id === currentUser._id ? formData : user)),
        );
        toast.success('User updated successfully');
      } else {
        await addUser(formData);
        setUsers([...users, formData]);
        toast.success('User added successfully');
      }
      setModalOpen(false);
    } catch (error) {
      console.log('Error saving user:', error);
      toast.error('Failed to save user');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>User List</h3>
      </div>
      {/* Buttons Section */}
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-success" onClick={handleAdd}>
          Add User
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e) => (
              <tr key={e._id}>
                <td>
                  {e._id.length > 5 ? `${e._id.substring(0, 5)}..` : e._id}
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phoneNumber}</td>
                <td>{e.role}</td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: e.status ? 'green' : 'red',
                    }}
                  ></span>
                </td>
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

      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Edit User' : 'Add User'}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>ID</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData._id}
                      disabled
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      desablwed={isEditing}
                    />
                  </div>
                  {!isEditing && (
                    <div className="form-group mt-2">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className="form-group mt-2">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Street</label>
                    <input
                      type="text"
                      name="address.street"
                      className="form-control"
                      value={formData.address.street}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>City</label>
                    <input
                      type="text"
                      name="address.city"
                      className="form-control"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>State</label>
                    <input
                      type="text"
                      name="address.state"
                      className="form-control"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Zip</label>
                    <input
                      type="text"
                      name="address.zip"
                      className="form-control"
                      value={formData.address.zip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Role</label>
                    <select
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>{' '}
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>{' '}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
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

export default Users;
