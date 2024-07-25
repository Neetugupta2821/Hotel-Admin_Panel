import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import MenuItem from '@mui/material/MenuItem';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const currencies3 = [
  {
    value: 'standard',
    label: 'standard',
  },
  {
    value: 'deluxe',
    label: 'deluxe',
  },
  {
    value: 'suite',
    label: 'suite',
  },
  {
    value: 'otherRoomType',
    label: 'otherRoomType',
  },

];
const currencies2 = [
  {
    value: 'true',
    label: 'available',
  },
  {
    value: 'false',
    label: 'unavailable',
  },


];

export default function AddRoomInFloor() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    if (name === "floor") {
      setFloor(value); // Update the floor state
    }
    setInputData({ ...inputData, [name]: value });
  };
  const [floor, setFloor] = useState(" ")
  const [blogErr, setBlogErr] = useState(false);

  const [inputData, setInputData] = useState({
    room_number: "",
    type: " ",
    description: "",
    capacity: "",
    available: "",
    price: " "
  });

  const submitAllData = () => {

    setBlogErr({
      room_number: false,
      type: false,
      description: false,
      capacity: false,
      available: false,
      price: false,

    });

    // Validate the input fields
    if (!inputData.room_number) {
      setBlogErr((prevState) => ({ ...prevState, room_number: true }));
    }
    if (!inputData.price) {
      setBlogErr((prevState) => ({ ...prevState, price: true }));
    }
    
    if (!inputData.description) {
      setBlogErr((prevState) => ({ ...prevState, description: true }));
    }
     

    if (!inputData.capacity) {
      setBlogErr((prevState) => ({ ...prevState, capacity: true }));
    }
    if (!inputData.available) {
      setBlogErr((prevState) => ({ ...prevState, available: true }));
    }
   



    // If any field is empty, stop the submission
    if (
      !inputData.room_number ||
       
     
      !inputData.description ||
    !inputData.price||
      !inputData.capacity ||
      !inputData.available 
       
    

    ) {
      return;
    }
    // If all fields are filled out, proceed with the form submission
   

    axios
      .post(`${baseUrl}addRooms/${location.state.id}`,  {

        "floor_Number":parseInt(floor),
        "rooms": [{
          "room_number": inputData.room_number,
          "type":inputData.type,
          "description":inputData.description,
          "capacity":parseInt(inputData.capacity),
          "available":JSON.parse(inputData.available),
          "price": parseInt(inputData.price)
        }]
      })
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "New  Hote created successfully!", "success");
        navigate("/admin/GetRoomFloorData");

        setBlogErr(false);
        // Reset the form fields and error state after successful submission

        setInputData({
          room_number: "",
          type: "",
          description: "",
          capacity: "",
          available: "",
          price: ""
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
  // console.log(inputData)

  return (
    <>
      {/* Add new Job in French*/}
      <div className="container">
        <div className="header-div">
          <span>
            <i className="fas fa-users"></i>
          </span>
          <span>New Floor/Room</span>
        </div>
        <div className="row row-style">
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  name="floor"
                  value={floor}
                  onChange={submitInputdata}
                  label="Floor"
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !floor
                  ? "*Please Enter Your floor"
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
                  label="Room Number"
                  rows={4.5}
                  type="number"
                  name="room_number"
                  value={inputData.room_number}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.room_number
                  ? "*Please Enter Your room_number"
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
                  label="Capacity"
                  rows={4.5}
                  type="text"
                  name="capacity"
                  value={inputData.capacity}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.capacity
                  ? "*Please Enter Your capacity"
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
                  label="Price"

                  rows={4.5}
                  type="text"
                  name="price"
                  value={inputData.price}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.price
                  ? "*Please Enter Your price"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-6 my-3">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Type"
                  defaultValue="AC"
                  rows={4.5}
                  onChange={submitInputdata}
                  value={inputData.type}
                  name="type"
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
                {blogErr && !inputData.type
                  ? "*Please Enter Your userType"
                  : ""}
              </span>
            </div>

          </div>
          <div className="col-6 my-3">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="available"
                  defaultValue="AC"
                  rows={4.5}
                  onChange={submitInputdata}
                  value={inputData.available}
                  name="available"
                  size="normal"
                >
                  {currencies2.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.available
                  ? "*Please Enter Your userType"
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
                  label="Description"
                  rows={4.5}
                  type="text"
                  multiline
                  name="description"
                  value={inputData.description}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.description
                  ? "*Please Enter Your password"
                  : ""}
              </span>
            </div>
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
