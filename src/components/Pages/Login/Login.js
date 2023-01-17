import {  useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"
import { NavLink, Prompt } from "react-router-dom";
import { dangNhap } from "../../../redux/Actions/FilmActions";


// import { testAction } from "../../../redux/Actions/FilmActions";

export default function Login(props) {
  const {errTK} = useSelector((rootReducer) => rootReducer.FilmReducer);
  
  const dispatch = useDispatch();
  
  // const[oLai, setOLain]=useState({isSaveForm:true})
  

    const formik = useFormik({
        initialValues :{
            email : "",
            password :"",
            errLogin:errTK
        },
        validationSchema:Yup.object().shape({
          email: Yup.string().matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email khong hop le"
          ).required("tai khoan khong duoc bo trong"),
          password: Yup.string()
        .required("mat khau khong duoc bo trong")
        .min(6, "Mat khau tu 6-32 ky tu")
        .max(32, "Mat khau tu 6-32 ky tu")
        }),
        onSubmit:(values)=>{
          const action = dangNhap(values);
          dispatch(action);
        }
    },[]);
    
    

  return (
    
    <div className="row bg-login" >
      <div className="container login-container mt-0 mb-0" >
      <div className="row m-0">
        
        <div className="col-md-3">
        
        </div>
        <div className="col-md-6 login-form-1">
          <form onSubmit={formik.handleSubmit}>
          <h3>Login</h3>
          <h5 name = "errLogin" className="text-danger p-2"  value ={formik.values.errLogin} 
          >
          {errTK}
         
          </h5>
            <div className="form-group" >
                
            <input
          className="form-control"
          name="email"
          placeholder="Your Email *"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Your Password *"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
            </div>
            <div className="form-group" >
              <button type="submit" className="btn btn-primary btnSubmit" 
                disabled = {!formik.isValid}>Login</button>
            </div>
            <div className="form-group" >
              <a href="#" className="ForgetPwd">
                Forget Password?
              </a>
            </div>
            <div className="form-group" >
              <NavLink to={"/register"} className="ForgetPwd">
                Register new account?
              </NavLink>
            </div>
            {/* <Prompt when = {oLai.isSaveForm} message = {(location)=>{
              return 'Ban co muon roi khoi trang nay khong?';
            }}/> */}
          </form>
        </div>
        
      </div>
    </div>
    </div>    
  );
}
