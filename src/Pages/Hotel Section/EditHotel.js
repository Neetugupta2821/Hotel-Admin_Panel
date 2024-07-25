import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
 
import { useLocation } from "react-router-dom";
 

export default function EditHotel() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [defaultImage, setDefaultImage] = useState([]);
  const [inputData, setInputData] = useState({
    Hotel_name: "",
    address: "",
    aboutHotel: "",
    hotelType: "",
  });
  const [blogErr, setBlogErr] = useState(false);
  const location = useLocation();
  const updateData = () => {
    console.log(location.state.response);
    const selectedUser = location.state.response.filter((item) => {
      return item._id === location.state.id;
    });
    const getData = selectedUser[0];


    setInputData({
      Hotel_name: getData.Hotel_name || "",
      address: getData.address || "",
      aboutHotel: getData.aboutHotel || "",
      hotelType: getData.hotelType || "",

    });
    const Imagedata = () => {

      return getData.HotelImages ? getData.HotelImages[0] : null;
    };

    console.log(Imagedata());
    setDefaultImage(getData.HotelImages);
  };
  useEffect(() => {
    updateData();
  }, []);
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Add each selected image to the array
      imagesArray.push(file);
    }
    setSelectedImage(imagesArray);
    console.log(imagesArray)
  };

  console.log(defaultImage)
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
                  name="Hotel_name"
                  value={inputData.Hotel_name}
                  onChange={submitInputdata}
                  label="Hotel name"
                  size="normal"
                />
              </div>

              <span style={{ color: "red" }}>
                {blogErr && !inputData.Hotel_name
                  ? "*Please Enter Your Hotel name"
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
                  label="Address"
                  rows={4.5}
                  type="text"
                  name="address"
                  value={inputData.address}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.address
                  ? "*Please Enter Your Address"
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
                  label="Hotel Type"
                  rows={4.5}
                  type="text"
                  name="hotelType"
                  value={inputData.hotelType}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.hotelType
                  ? "*Please Enter Your HotelType"
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
                  label="aboutHotel"
                  multiline
                  rows={4.5}
                  type="text"
                  name="aboutHotel"
                  value={inputData.aboutHotel}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.aboutHotel
                  ? "*Please Enter Your AboutHotel"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-6  justify-content-center">
            <h6 className=" mb-0">Upload Image</h6>

            <input type="file" id="files" name="files" multiple onChange={handleFileSelect}  className="my-2"/>
            <div className="d-flex inline-flex">
              {selectedImage ? (
                selectedImage.map((image, index) => (
                  <div key={index} className="image-preview mr-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index + 1}`}
                      style={{"maxWidth":"50%","height":"auto"}}
                    />
                  </div>
                ))
              ) : (
                defaultImage && defaultImage.map((image, index) => (
                  <div key={index} className="image-preview mr-2">
                    <img
                      src={`http://192.168.1.54:2501/${image}`}
                      alt={`Image ${index + 1}`}
                      style={{"maxWidth":"50%","height":"auto"}}
                    />
                  </div>
                ))
              )}
            </div>
            

            <span style={{ color: "red" }}>
              {blogErr && !selectedImage ? "*Please upload your image" : ""}
            </span>
          </div>


          <div className="col-12 d-flex justify-content-center mt-2">
            <button
              type="button"
              className="global_button mb-3"
              style={{ borderRadius: "5px" }}
            // onClick={submitAllData}
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
