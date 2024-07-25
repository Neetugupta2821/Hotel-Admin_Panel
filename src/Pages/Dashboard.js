 import React, { useEffect, useState } from 'react'
 import "./Dashboard.css";
 import axios from "axios";
import { baseUrl } from '../BaseUrl/BaseUrl';
 
  
 export default function Dashboard() {
  const [count,setCount] =useState([])


  const handlechangeCount =()=>{
    axios.get(`${baseUrl}Dashboard_all_count`).then((response)=>{
      console.log(response.data)
      setCount(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    handlechangeCount()
  },[])
  
   return (
    <>
    {/*API to show the count of job and Blog */}
    <div className="">
         
    <div className="row">
     
        <div class="cards">
        <div class="dashboard-card" >
          <div class="card-content">
            <div class="number">{count.HotelManagers}</div>
            <div class="card-name">Total Hotel Managers</div>
          </div>
          <div class="icon-box">
            <i class="fas fa-user-graduate"></i>
          </div>
        </div>
        <div class="dashboard-card" >
          <div class="card-content">
            <div class="number">{count.SubAdmin}</div>
            <div class="card-name">Total SubAdmin</div>
          </div>
          <div class="icon-box">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
        </div>
        <div class="dashboard-card">
          <div class="card-content">
            <div class="number">{count.bookings}</div>
            <div class="card-name">Total bookings</div>
          </div>
          <div class="icon-box">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <div class="dashboard-card">
          <div class="card-content">
            <div class="number">{count.Hotels}</div>
            <div class="card-name">Total Hotels</div>
          </div>
          <div class="icon-box">
            <i class="fas fa-dollar-sign"></i>
          </div>
        </div>
      </div>
 
       
    </div>
    {/* <div className="row mt-3 ">
      <div className="  col-lg-3 col-md-6 col-sm-12  mt-2">
        <div className="bg-white p-2 pending_style">
          <div>
            <p className="desc">000</p>
            <h4 className="mb-0 sub-title">Restaurants</h4>
          </div>
        </div>
      </div>
      <div className="  col-lg-3 col-md-6 col-sm-12  mt-2">
        <div className="bg-white p-2 active_style">
          <div>
            <p className="desc">Total Revenue</p>
            <h4 className="mb-0 sub-title">000</h4>
          </div>
        </div>
      </div>
    </div> */}
    {/* <div className="row">
      <div className="col-12 mt-4">
        <h6 className="desc">MONTHLY REVENUE</h6>
      </div>
      <div className="col-12">
        <Chart options={options} series={series} type="bar" width="100%" />
      </div>
    </div> */}
  </div></>
   )
 }
 