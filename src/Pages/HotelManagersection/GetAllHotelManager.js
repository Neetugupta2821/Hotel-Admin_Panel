import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import axios from "axios";
import "./GetAllHotelManager.css";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
 

export default function GetAllHotelManager() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
  };
  const getdataList = () => {
    axios
      .get(`${baseUrl}getAll_HotelManager`)
      .then((response) => {
        console.log(response);
        console.log(response.data.manager_Details);
        setRows(response.data.manager_Details);
        setSearchApiData(response.data.manager_Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdataList();
  }, []);
  const addJobsData = () => {
    navigate("/admin/AddHotelManager");
  };

  
  const dataActiveInactive = (id, data) => {
    console.log(id, data);
    axios
      .post(`${baseUrl}active_inactive_blog/${id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        if (data == 1) {
          Swal.fire("Status!", "DeActivate.", "success");
          getdataList();
        } else {
          Swal.fire("Status!", "Activate.", "success");
          getdataList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.name}`.toLowerCase();
        const emailMatches = item.email.toLowerCase();
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          fullName.includes(searchValue) || emailMatches.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  return (
    <div>
      {/*List of  All Blog[French]*/}
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Hotel Manager
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search"
            id="outlined-size-small"
            size="small"
              value={filterValue}
              onChange={(e) => handleFilter(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {filterValue && (
                  <IconButton onClick={handleClearFilter} edge="end">
                    <ClearIcon />
                  </IconButton>
                )}
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Button
            className="global_button"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={addJobsData}
          >
            Add Manager
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead  style={{ "white-space": "nowrap" }}>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Email
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Image
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Contact No
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Manager Id
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  User Type
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  CreatedAt
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell align="left">
                        {row.name ? row.name : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.email}
                      </TableCell>
                      <TableCell align="left">
                        {row.profileImage ? (
                          <img  
                            src={"http://192.168.1.54:2501/" + row.profileImage[0]}
                            alt="loading"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="loading"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {row.contact_no ? row.contact_no : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.manager_id ? row.manager_id : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.userType ? row.userType : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.createdAt
                          ? moment(row.createdAt).format("LL")
                          : "_"}
                      </TableCell>
                      
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "red",
                              cursor: "pointer",
                            }}
                          //   onClick={() => {
                          //     deleteUser(row._id);
                          //   }}
                          />
                          <EditLocationAltIcon
                            style={{
                              fontSize: "20px",
                              color: "#572131",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate("/admin/EditHotelManager", {
                                state: {
                                  id: row._id,
                                  response: rows,
                                  managId: row.manager_id
                                },
                              })
                            }
                          />
                        </Stack>
                      </TableCell>

                      <TableCell align="left">
                        {
                          <BootstrapSwitchButton
                            width={100}
                            checked={Boolean(row.status)}
                            onlabel="Active"
                            offlabel="Inactive"
                            onstyle="success"
                            onChange={() => {
                              dataActiveInactive(row._id, row.status);
                            }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
