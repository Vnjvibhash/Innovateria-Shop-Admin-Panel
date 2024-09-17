import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const [user, setUser] = useState({
        role: 3,
        name: "",
        email: "",
        mobile: "",
        password: "",
        address: "",
        dob: "",
        profession: "",
        department: "",
        image: "",
    });
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(user);
        const formData = new FormData();
        formData.append('role', user.role);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('mobile', user.mobile);
        formData.append('password', user.password);
        formData.append('address', user.address);
        formData.append('dob', user.dob);
        formData.append('profile_pic', user.image);
        formData.append('profession', user.profession);
        formData.append('department', user.department);
        await axios.post('http://localhost:3000/admin/add_user', formData)
            .then(result => {
                if (result.data.Status) {
                    console.log(result.data);
                    // navigate('/dashboard/users');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add User</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputRole" className="form-label">
                            Role <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputRole"
                            placeholder="0"
                            maxLength={1}
                            onChange={(e) =>
                                setUser({ ...user, role: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label">
                            Email <span className="text-danger">*</span>
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputMobile" className="form-label">
                            Mobile Number <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputMobile"
                            maxLength={10}
                            placeholder="+91-7762974716"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, mobile: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword" className="form-label">
                            Password <span className="text-danger">*</span>
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword"
                            placeholder="Enter Password"
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                        <label htmlFor="inputDOB" className="form-label">
                            Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputDOB"
                            placeholder="06/12/1996"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, dob: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputProfession" className="form-label">
                            Profession
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputProfession"
                            placeholder="Your Profession"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, profession: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputDepartment" className="form-label">
                            Department
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputDepartment"
                            placeholder="Department"
                            autoComplete="off"
                            onChange={(e) =>
                                setUser({ ...user, department: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="inputGroupFile01" className="form-label">
                            Select Image <span className="text-danger">*</span>
                        </label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(e) => setUser({ ...user, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;