import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './AddHotelManager.css'
export default function AddHotelManager() {
    const currencies3 = [
        {
            value: 'HotelManager',
            label: 'HotelManager',
        },
        {
            value: 'sub_Admin',
            label: 'sub_Admin',
        },



    ];
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        contact_no: "",
        userType: ""
    });
    const [blogErr, setBlogErr] = useState(false);
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    const submitInputdata = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };
    const submitAllData = () => {
        // Reset the error state
        setBlogErr({
            name: false,
            email: false,
            password: false,
            contact_no: false,
            userType: false
        });

        // Validate the input fields
        if (!inputData.name) {
            setBlogErr((prevState) => ({ ...prevState, name: true }));
        }
        if (!selectedImage) {
            setBlogErr((prevState) => ({ ...prevState, selectedImage: true }));
        }
        if (!inputData.email) {
            setBlogErr((prevState) => ({ ...prevState, email: true }));
        }
        if (!inputData.password) {
            setBlogErr((prevState) => ({ ...prevState, password: true }));
        }
        if (!inputData.contact_no) {
            setBlogErr((prevState) => ({ ...prevState, contact_no: true }));
        }

        if (!inputData.userType) {
            setBlogErr((prevState) => ({ ...prevState, userType: true }));
        }

        // If any field is empty, stop the submission
        if (!inputData.name || !selectedImage || !inputData.email || !inputData.contact_no || !inputData.userType || !inputData.password) {
            return;
        }

        // If all fields are filled out, proceed with the form submission
        const formData = new FormData();
        formData.append("profileImage", selectedImage);
        formData.append("name", inputData.name);
        formData.append("password", inputData.password);
        formData.append("contact_no", inputData.contact_no);
        formData.append("userType", inputData.userType);
        formData.append("email", inputData.email);

        axios
            .post(`${baseUrl}createHotel_manager`, formData)
            .then((response) => {
                console.log(response);
                Swal.fire("Success", "Hotel Manager created successfully!", "success");
                navigate("/admin/GetAllHotelManager");

                setBlogErr(false);
                // Reset the form fields and error state after successful submission
                setSelectedImage(null);
                setInputData({
                    name: "",
                    email: "",
                    password: "",
                    contact_no: "",
                    userType: ""
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire(
                    "Error",
                    `${error?.response?.data?.message}`,
                    "error"
                );
            });
    };


    return (
        <>
            {/* Add new Job in French*/}
            <div className="container">
                <div className="header-div">
                    <span>
                        <i className="fas fa-users"></i>
                    </span>
                    <span>New Hotel Manager</span>
                </div>
                <div className="row row-style">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <TextField
                                    fullWidth
                                    className="mb-1 mt-3 w-100"
                                    type="text"
                                    name="name"
                                    value={inputData.name}
                                    onChange={submitInputdata}
                                    label="Name"
                                    size="normal"
                                />
                            </div>

                            <span style={{ color: "red" }}>
                                {blogErr && !inputData.name
                                    ? "*Please Enter Your name"
                                    : ""}
                            </span>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <TextField
                                    className="mb-1 mt-3 w-100"
                                    id="outlined-multiline-static"
                                    label="Email"
                                    rows={4.5}
                                    type="text"
                                    name="email"
                                    value={inputData.email}
                                    onChange={submitInputdata}
                                    size="normal"
                                />
                            </div>
                            <span style={{ color: "red" }}>
                                {blogErr && !inputData.email
                                    ? "*Please Enter Your email"
                                    : ""}
                            </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <TextField
                                    className="mb-1 mt-3 w-100"
                                    id="outlined-multiline-static"
                                    label="Password"
                                    rows={4.5}
                                    type="text"
                                    name="password"
                                    value={inputData.password}
                                    onChange={submitInputdata}
                                    size="normal"
                                />
                            </div>
                            <span style={{ color: "red" }}>
                                {blogErr && !inputData.password
                                    ? "*Please Enter Your password"
                                    : ""}
                            </span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <TextField
                                    className="mb-1 mt-3 w-100"
                                    id="outlined-multiline-static"
                                    label="Contact No"

                                    rows={4.5}
                                    type="text"
                                    name="contact_no"
                                    value={inputData.contact_no}
                                    onChange={submitInputdata}
                                    size="normal"
                                />
                            </div>
                            <span style={{ color: "red" }}>
                                {blogErr && !inputData.contact_no
                                    ? "*Please Enter Your Contact No"
                                    : ""}
                            </span>
                        </div>
                    </div>
                    <div className="col-6 justify-content-center">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="User Type"
                                    defaultValue="AC"
                                    rows={4.5}
                                    onChange={submitInputdata}
                                    value={inputData.userType}
                                    name="userType"
                                    size="normal"
                                >
                                    {currencies3.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <span style={{ color: "red" }}>
                                {blogErr && !inputData.userType
                                    ? "*Please Enter Your userType"
                                    : ""}
                            </span>
                        </div>
                    </div>
                    <div className="col-6  justify-content-center">
                        <h6 className=" mb-0">Upload Image</h6>
                        <TextField
                            type="file"
                            //   label="Upload"
                            className="mb-1  w-100"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                        {selectedImage && (
                            <div className="image-preview">
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    style={{ height: "100px" }}
                                />
                            </div>
                        )}
                        <span style={{ color: "red" }}>
                            {blogErr && !selectedImage ? "*Please upload your image" : ""}
                        </span>
                    </div>


                    <div className="col-12 d-flex justify-content-center mt-2">
                        <button
                            type="button"
                            className="global_button mb-3"
                            style={{ borderRadius: "5px" }}
                            onClick={submitAllData}
                        >
                            Submit
                            <ArrowRightAltIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
