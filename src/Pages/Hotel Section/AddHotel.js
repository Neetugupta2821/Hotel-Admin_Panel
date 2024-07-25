import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Box } from "@mui/material";
import { baseUrl } from "../../BaseUrl/BaseUrl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Airport shuttle',
  'Restaurant',
  'Free WiFi',
  'Parking',
  'Non-smoking rooms',
  'Room service',
  '24-hour front desk',
  'Family rooms',
  'Pets allowed',
  'Wheelchair accessible',
  'Fitness centre',
  'Swimming Pool',
  'Spa and wellness centre',
  'Electric vehicle charging station'
];
export default function AddHotel() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState([]);
  const [manager, setManager] = useState([])
  const [inputData, setInputData] = useState({
    Hotel_name: "",
    address: "",
    city: "",
    aboutHotel: "",
    hotelType: "",
  });
  const [blogErr, setBlogErr] = useState(false);
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

  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };


  const handleManagerData = () => {
    axios.get(`${baseUrl}getAll_HotelManager`).then((response) => {
      console.log(response.data.manager_Details)
      setManager(response.data.manager_Details)
    }).catch((error) => {
      console.log(error)
    })
  }
  useState(() => {
    handleManagerData()
  })
  const [personName, setPersonName] = React.useState([]);
  const [facilitiesName, setfacilitiesName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setfacilitiesName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const submitAllData = () => {


    const formattedFacilities = facilitiesName.map((facility) => ({
      facilityType: facility,
    }));
     
    setBlogErr({
      Hotel_name: false,
      address: false,
      city: false,
      aboutHotel: false,
      hotelType: false,
      personName: false,
      facilitiesName: false,
      selectedImage: false
    });

    // Validate the input fields
    if (!inputData.Hotel_name) {
      setBlogErr((prevState) => ({ ...prevState, Hotel_name: true }));
    }
    if (selectedImage.length === 0) {
      setBlogErr((prevState) => ({ ...prevState, selectedImage: true }));
    }
    if (!inputData.address) {
      setBlogErr((prevState) => ({ ...prevState, address: true }));
    }
    if (!inputData.city) {
      setBlogErr((prevState) => ({ ...prevState, city: true }));
    }
    if (!inputData.aboutHotel) {
      setBlogErr((prevState) => ({ ...prevState, aboutHotel: true }));
    }

    if (!inputData.hotelType) {
      setBlogErr((prevState) => ({ ...prevState, hotelType: true }));
    }
    if (personName.length === 0) {
      setBlogErr((prevState) => ({ ...prevState, personName: true }));
    }
    if (facilitiesName.length === 0) {
      setBlogErr((prevState) => ({ ...prevState, facilitiesName: true }));
    }

    // If any field is empty, stop the submission
    if (
      !inputData.Hotel_name ||
      selectedImage.length ===0 ||
      !inputData.address ||
      !inputData.city ||
      !inputData.aboutHotel ||
      !inputData.hotelType ||
      personName.length === 0 ||
      facilitiesName.length === 0
    ) {
      return;
    }
    // If all fields are filled out, proceed with the form submission
    const formData = new FormData();
    for (let i = 0; i < selectedImage.length; i++) {
      formData.append("HotelImages", selectedImage[i]);
    }
    formData.append("address", inputData.address);
    formData.append("city", inputData.city);
    formData.append("aboutHotel", inputData.aboutHotel);
    formData.append("hotelType", inputData.hotelType);
    formData.append("manager_id", personName);
    formData.append("facilities", JSON.stringify(formattedFacilities));
    formData.append("Hotel_name", inputData.Hotel_name);

    axios
      .post(`http://192.168.1.54:2501/api/create_Hotel`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "New  Hote created successfully!", "success");
        navigate("/admin/GetAllHotel");

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
  console.log(
    inputData.Hotel_name,
    inputData.address,
    inputData.city,
    inputData.aboutHotel,
    inputData.hotelType,
    personName,
    facilitiesName,
    selectedImage
  )
console.log(blogErr)

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
                  label="city"
                  rows={4.5}
                  type="text"
                  name="city"
                  value={inputData.city}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.city
                  ? "*Please Enter Your City"
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
                <FormControl sx={{ m: 1, width: 620 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Facilities</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={facilitiesName}
                    onChange={handleChange2}
                    input={<OutlinedInput label="facilities" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={facilitiesName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <span style={{ color: "red" }}>
                {blogErr && facilitiesName.length === 0
                  ? "*Please Enter Your Facilities"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <FormControl sx={{ m: 1, width: 620 }}>
                  <InputLabel id="demo-multiple-checkbox-label">manager ID</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"

                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="manager id" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {manager.map((name) => (
                      <MenuItem key={name.manager_id} value={name.manager_id}>
                        <Checkbox checked={personName.indexOf(name.manager_id) > -1} />
                        <ListItemText primary={name.manager_id} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <span style={{ color: "red" }}>
                {blogErr &&  personName.length === 0 
                  ? "*Please Enter Your Manager ID"
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

            <input type="file" id="files" name="files" multiple onChange={handleFileSelect} />
            <div className="d-flex inline-flex">
              {selectedImage.length > 0 && (
                <div className="image-preview">
                  {selectedImage.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Selected ${index}`}
                        style={{ height: "100px", marginRight: "10px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span style={{ color: "red" }}>
              {blogErr && selectedImage.length===0 ? "*Please upload your image" : ""}
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
