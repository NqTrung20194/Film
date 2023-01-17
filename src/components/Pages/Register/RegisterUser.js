import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"
import { Prompt } from "react-router-dom";
import {  useFormik } from "formik";
import { Registers } from '../../../redux/Actions/FilmActions';

export default function RegisterUser(props) {
    const {errTK} = useSelector((rootReducer) => rootReducer.FilmReducer);
    const dispatch = useDispatch();

    const[oLai, setOLain]=useState({isSaveForm:true});

    const formik = useFormik({
        initialValues :{
            name:"",
            email : "",
            password :"",
            confirmPassword:"",
            phone : ""
        },
        validationSchema:Yup.object().shape({
          name: Yup.string()
        .required("Tên khong duoc bo trong")
        .min(6, "Tên tu 6-32 Ký tự")
        .max(32, "Tên tu 6-32 Ký tự"),
          email: Yup.string().matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Email khong hop le"
          ).required("Tai khoan khong duoc bo trong"),
          password: Yup.string()
        .required("Mat khau khong duoc bo trong")
        .min(6, "Mat khau tu 6-32 ky tu")
        .max(32, "Mat khau tu 6-32 ky tu"),
        phone: Yup.string()
        .required("So dien thoai khong duoc bo trong")
        .min(9, "So dien thoai khong it hon 10 ky tu")
        .max(11, "So dien thoai khong nhieu hon 10 ky tu"),
        confirmPassword : Yup.string()
        .required("Mat khau khong duoc bo trong")
        .min(6, "Mat khau tu 6-32 ky tu")
        .max(32, "Mat khau tu 6-32 ky tu")
        .oneOf([Yup.ref("password")],"Mật khẩu nhập lại không đúng"),
        }),
        onSubmit:(values)=>{
          const action = Registers(values);
          dispatch(action);}
    });

  return (
    <div className="row bg-login" >
      <div className="container login-container mt-0 mb-0" >
      <div className="row m-0">
        <div className="col-md-3"></div>
        <div className="col-md-6 login-form-1">
          <form onSubmit={formik.handleSubmit}>
          <h3>Register</h3>
          <div className="form-group">                
            <input
          className="form-control"
          name="name"
          placeholder="Your Name *"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
            </div>
            <div className="form-group">                
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

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm your Password *"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <div className="text-danger">{formik.errors.confirmPassword}</div>
        ) : null}
            </div>

            <div className="form-group">                
            <input
          className="form-control"
          name="phone"
          placeholder="Your Phone Numbers *"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div className="text-danger">{formik.errors.phone}</div>
        ) : null}
            </div>

            <div className="form-group" >
              <button type="submit" className="btn btn-primary btnSubmit" disabled = {!formik.isValid}>Submit</button>
            </div>
            
            <Prompt when = {oLai.isSaveForm} message = {(location)=>{
              return 'Ban co muon roi khoi trang nay khong?';
            }}/>
          </form>
        </div>
        
      </div>
    </div>
    </div>
  )
}
