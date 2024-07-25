import React from 'react'

import Tabs from "@mui/material/Tabs";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import "./DetailHotelPage.css";
import { useLocation } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'



export default function DetailHotelPage() {
    const location = useLocation();
    console.log(location.state.response);
    console.log(location.state.id);
    const getArrayData = location.state.response.filter((info) => {
        return info._id === location.state.id
    })
    console.log(getArrayData)
    const getData = getArrayData[0]
    const floor = getArrayData[0].floors
    console.log(floor)
    const Room = floor.r
    return (
        <>
            {/*Detail of Clicked Blog [French]*/}
            <div className="main_div">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="row">
                                <h4 className="mt-3 host_style">Hotel Details</h4>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Box sx={{ width: "100%" }}>
                                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                            <Tabs
                                                // value={value}
                                                // onChange={handleChange}
                                                aria-label="basic tabs example"
                                            >

                                            </Tabs>
                                        </Box>
                                        {/* value={value} index={0} */}

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className="paragraf_style">Hotel_Id</p>
                                                    <p className="paragraf_style">Hotel_name</p>
                                                    <p className="paragraf_style">address</p>
                                                    <p className="paragraf_style">city</p>
                                                    <p className="paragraf_style">manager_id </p>
                                                    <p className="paragraf_style">hotelType</p>
                                                    <p className="paragraf_style">Hotel createdAt</p>
                                                    <p className="paragraf_style">Hotel Status</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className="paragraf_style">{getData.Hotel_Id}</p>
                                                    <p className="paragraf_style">
                                                        {getData.Hotel_name}
                                                    </p>
                                                    <p className="paragraf_style">
                                                        {getData.address ? getData.address : "_"}
                                                    </p>
                                                    <p className="paragraf_style">
                                                        {" "}
                                                        {getData.city
                                                            ? getData.city
                                                            : "_"}
                                                    </p>
                                                    <p className="paragraf_style">
                                                        {getData.manager_id
                                                            ? getData.manager_id
                                                            : "_"}
                                                    </p>
                                                    <p className="paragraf_style">
                                                        {" "}
                                                        {getData.hotelType
                                                            ? getData.hotelType
                                                            : "_"}
                                                    </p>
                                                    <p className="paragraf_style">
                                                        {getData.createdAt ? getData.createdAt : "_"}
                                                    </p>
                                                    {getData.blog_status == "0" ? (
                                                        <p
                                                            className="mb-2 mr-2 badge "
                                                            style={{
                                                                color: "#ffffff",
                                                                backgroundColor: "#29cc97",
                                                            }}
                                                        >
                                                            InActive
                                                        </p>
                                                    ) : (
                                                        <p
                                                            className="mb-2 mr-2 badge "
                                                            style={{
                                                                color: "#ffffff",
                                                                backgroundColor: "red",
                                                            }}
                                                        >
                                                            Active
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box>
                <div className="ms-invoice-table table-responsive mt-5">
                    <h6>Total Floor/Room in this Hotel</h6>
                    {getData.floors.map((item) => (
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography>Floor No{item.floor_Number}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <table className="table table-hover text-right thead-light">
                                        <thead>
                                            <tr className="text-capitalize">
                                                <th className="text-center w-5 common_style">S. No.</th>
                                                <th className="text-left common_style">Room number</th>
                                                <th className="common_style">Type</th>
                                                <th className="common_style">Description</th>
                                                <th className="common_style">Capacity</th>
                                                <th className="common_style">price</th>
                                                <th className="common_style">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.rooms.map.length > 0 ? (
                                                item.rooms.map((row, i) => (
                                                    <tr key={i}>
                                                        <td className="text-center common_style">{i + 1}</td>
                                                        <td className="text-left common_style">{row.room_number}</td>
                                                        <td className="common_style">{row.type}</td>
                                                        <td className="common_style">{row.description}</td>
                                                        <td className="common_style">{row.capacity}</td>
                                                        <td className="common_style">{row.price}</td>
                                                        <td className="common_style"><BootstrapSwitchButton
                                                            width={100}
                                                            checked={Boolean(row.status)}
                                                            onlabel="Active"
                                                            offlabel="Inactive"
                                                            onstyle="success"

                                                        /></td>


                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6"><h3>No Jobs Apply</h3></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </Box>
        </>
    )
}
