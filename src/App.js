 
import './App.css';
import Main from './Component/SideBar';
import { BrowserRouter } from 'react-router-dom';
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Product from './Pages/Product';
import Comment from './Pages/Comment';
import Analytics from './Pages/Analytics';
import Aboutus from './Pages/Aboutus';
import Login from './Page/SuperAdminLogin/Login';
import Protected from '../src/Component/Protected'
import MyProfile from './Page/SuperAdminLogin/MyProfile';
import GetAllHotelManager from './Pages/HotelManagersection/GetAllHotelManager';
import AddHotelManager from './Pages/HotelManagersection/AddHotelManager';
import EditHotelManager from './Pages/HotelManagersection/EditHotelManager';
import GetAllHotel from './Pages/Hotel Section/GetAllHotel';
import DetailHotelPage from './Pages/Hotel Section/DetailHotelPage';
import AddHotel from './Pages/Hotel Section/AddHotel';
import EditHotel from './Pages/Hotel Section/EditHotel';
import AddRoomInFloor from './Pages/Hotel Section/AddRoomInFloor';
import GetRoomFloorData from './Pages/Hotel Section/GetRoomFloorData';
import GetAllUserData from './Pages/UserSection/GetAllUserData';

function App() {
  console.log('fsdgdfghfh')
  return (
    <div className="App">
        
        <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Protected Component={Main} />}>
            <Route index element={<Dashboard />} />
            <Route path="Product" element={<Product />} />
            <Route path="GetAllUserData" element={<GetAllUserData />} />
            <Route path="Analytics" element={<Analytics />} />
            <Route path="GetAllHotelManager" element={<GetAllHotelManager />} />
            <Route path='MyProfile' element={<MyProfile/>}/> 
            <Route path='AddHotelManager' element={<AddHotelManager/>}/> 
            <Route path='EditHotelManager' element={<EditHotelManager/>}/> 
            <Route path='GetAllHotel' element={<GetAllHotel/>}/> 
            <Route path='DetailHotelPage' element={<DetailHotelPage/>}/> 
            <Route path='AddHotel' element={<AddHotel/>}/> 
            <Route path='EditHotel' element={<EditHotel/>}/>
            <Route path='AddRoomInFloor' element={<AddRoomInFloor/>}/>
            <Route path='GetRoomFloorData' element={<GetRoomFloorData/>}/>
          </Route>

        </Routes>
        </BrowserRouter>
   
     
     
      
    </div>
  );
}

export default App;
