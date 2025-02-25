import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
 
 
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
 
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
 
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
 
import { useLocation } from "react-router-dom"; // Import the useLocation hook
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children }) {
    const [nameValue, setNameValue] = useState("");
    const [imageValue, setImageValue] = useState("");
  
    const location = useLocation(); // Get the current location
    const { state } = location;
    
    const localStorageValue = localStorage.getItem("name");
    // const location = useLocation(); // Get the current location
    // const MenuItem = [
    //     {
    //       path: '/Dashboard',
    //       name: 'Dashboard',
    //       icon: <BookmarksIcon />
    //     },
    //     {
    //       path: '/Aboutus',  // Make sure this path is correct
    //       name: 'Aboutus',
    //       icon: <Filter1Icon />
    //     },
    //     {
    //       path: '/Product',
    //       name: 'Product',
    //       icon: <LegendToggleIcon />
    //     },
    //     {
    //       path: '/Comment',
    //       name: 'Comment',
    //       icon: <ViewStreamIcon />
    //     },
    //     {
    //       path: '/Analytics',
    //       name: 'Analytics',
    //       icon: <ContentCopyIcon />
    //     }
    //   ];
    //   console.log(MenuItem);  
    const getActiveKey = () => {
        const path = location.pathname;
        // Implement your logic to determine the active key based on the 'path'
        // For example, you can use a switch statement or if-else conditions.
        // Here's a simple example:
        switch (path) {
          case "/admin":
            return ""; // Use the localStorage value if available, otherwise, use an empty string
          case "/admin/GetAllHotelManager":
            return "GetAllHotelManager";
          case "/admin/GetAllHotel":
            return "GetAllHotel";
          case "/admin/GetAllUserData":
            return "GetAllUserData";
          
            case "/admin/Analytics": 
                case "/admin/MyProfile":
                  case "/admin/AddHotelManager":
                    case "/admin/EditHotelManager":
                      case "/admin/DetailHotelPage":
                        case "/admin/AddHotel": 
                        case "/admin/EditHotel": 
                          case "/admin/AddRoomInFloor":
                            case "/admin/GetRoomFloorData":
              return "Analytics";
               
                
    
          // Add more cases for other pages
          default:
            return "";
        }
      };
    
      const [collapsed, setCollapsed] = useState(false);
    
      const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      const navigate = useNavigate();
    
      const signoutData = () => {
        localStorage.clear();
        navigate("/");
      };
      const adminImage = localStorage.getItem("image");
      useEffect(() => {
        // Retrieve the current value from localStorage
        const storedName = localStorage.getItem("name");
        const storedImage = localStorage.getItem("image");
    
        if (storedName) {
          setNameValue(storedName);
        } else {
          // If the "name" key doesn't exist in localStorage, set it with the value from state
          localStorage.setItem("name", state?.dataValue?.firstName || "");
          setNameValue(state?.dataValue?.firstName || "");
        }
        if (storedImage) {
          setImageValue(storedImage);
        } else {
          // If the "image" key doesn't exist in localStorage, set it with the value from state
          localStorage.setItem("image", state?.dataValue?.image || "");
          setImageValue(state?.dataValue?.image || "");
        }
      }, [nameValue, imageValue, state]);
       
    
      const menuStyle = {
        background: "#3c763b", // Customize the background color of the menu
        color: "#fff", // Customize the text color of the menu items
        height: "100vh",
      };    

    return (
        <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">
              {" "}
              <img
                src=""
                className=" festabash-l0go mb-3"
                style={{ width: "35px", height: "35px" }}
                alt=""
              />
            </span>
            <span className="lg-logo">super Admin</span>
          </h2>
        </div>
        <Menu
          // theme="light"
          mode="inline"
          style={menuStyle}
          defaultSelectedKeys={[getActiveKey()]} // Set the active key based on the URL
        
          onClick={({ key }) => {
            if (key === "signout") {
              // Handle signout
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: " ",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "GetAllHotelManager",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Hotel Manager",
            },

            {
              key: "GetAllHotel",
              icon: <BookmarkBorderIcon className="fs-4" />,
              label: "Hotel",
            },
           
            {
              key: "GetAllUserData",
              icon: < QuestionAnswerOutlinedIcon className="fs-4" />,
              label: "User Section",
            },
            {
              key: "Analytics",
              icon: <WorkOutlineOutlinedIcon className="fs-4" />,
              label: "Analytics",
            },  
            
             
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* {imageValue ? (
                  <img
                    style={{ borderRadius: "50%" }}
                    width={32}
                    height={32}
                    src={"http://13.51.205.211:2001/" + imageValue}
                    alt="loading"
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%" }}
                    width={32}
                    height={32}
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="loading"
                  />
                )} */}
                 <img
                    style={{ borderRadius: "50%" }}
                    width={32}
                    height={32}
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="loading"
                  />
              </div>
              <div>
                {/* <h5 className="mb-0">{nameValue}</h5> */}
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <NavLink
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/MyProfile"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/change-password"
                  >
                    Change Password
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={signoutData}
                  >
                    Signout
                  </button>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Syslearn Admin Panel ©2023 Created by Admin
        </Footer>
      </Layout>
    </Layout>
    );
}
