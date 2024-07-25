import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../BaseUrl/BaseUrl';
import { Link } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function GetRoomFloorData() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state.id);
    const [room, setRoom] = useState([])
    const handleFloorRoomData = () => {
        axios.get(`${baseUrl}getAll_floors_wise_Rooms_of_Hotel/${location.state.id}`).then((response) => {
            console.log(response.data.floors)
            setRoom(response.data.floors)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        handleFloorRoomData()
    }, [])

    const addJobsData = () => {
        navigate("/admin/AddRoomInFloor");

    };
    return (
        <div>

            <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Hotels List
                </Typography>
                <Divider />
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <TextField
                        sx={{ width: "25%" }}
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                        //   value={filterValue}
                        //   onChange={(e) => handleFilter(e)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {/* {filterValue && (
                  <IconButton onClick={handleClearFilter} edge="end">
                    <ClearIcon />
                  </IconButton>
                )} */}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>{" "}
                    <Link to='/admin/AddRoomInFloor' state={{id:location.state.id}}><Button
                        className="global_button"
                        variant="contained"
                        endIcon={<AddCircleIcon />}

                    >
                        Add Floor/Room
                    </Button></Link>
                </Stack>
                <Box height={10} />
                <div className="ms-invoice-table table-responsive mt-5">
                    <h6>Total Floor/Room in this Hotel</h6>
                    {room.map((item) => (
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

            </Paper>
        </div>
    )
}
