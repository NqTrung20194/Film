import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Infor from "./Infor";
import InforUsers from "./InforUsers";
import ChiTietUsers from "./chiTietUsers";


export default function UserDetails() {

  const [component,setComponent] = useState(<InforUsers/>);
  const dispatch = useDispatch();

  return (
    <div className="container-fluid UerInf">
      <div className="container ">
      <div className="row">
        <div className="col-3 " id="navIf">
          <nav className="navUser">
          <ul className="navbar-nav justify-content-center"  >
            <li className="nav-item " >
              <a className="nav-link pl-5 active"  onClick={()=>{
                // setComponent(<InforUsers/>)
                dispatch({
                  type:"INFOR_USERS",
                  Component : InforUsers,
                  onSubmit: ()=>{console.log('Infor user click')}
                })
              }} >
                Thông Tin Chung <span className="sr-only">(current)</span>
                
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link pl-5" onClick={()=>{
                // setComponent(<ChiTietUsers/>)
                dispatch({
                  type:"CHI_TIET_USERS",
                  Component : ChiTietUsers,
                  onSubmit: ()=>{console.log('chi tiet user click')}
                })
              }}>
              chi tiết tài khoản
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link pl-5" to={"/"}>
                thẻ thành viên
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link pl-5" to={"/"}>
                điểm thưởng
              </a>
            </li>
          </ul>
          </nav>
          
        </div>
        <div className="col-9">
          <Infor component = {component}/>
        </div>
      </div>
    </div>
    </div>
    
  );
}
