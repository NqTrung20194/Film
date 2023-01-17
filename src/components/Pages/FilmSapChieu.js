import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getActionPhim } from "../../redux/Actions/FilmActions";

export default function Hompage(props) {

  let {mangPhim} = useSelector(rootReducer=>rootReducer.FilmReducer);

  const dispatch = useDispatch()

  useEffect(()=>{
    const action = getActionPhim();
    dispatch(action);
  },[])

  const rederPhimSapChieu = ()=>{
    return mangPhim.map((phim, index)=>{
      if(phim.status === 2){
        return <div key={index} className="card text-left col-md-3 mt-2">
          <NavLink to={`/details/`+phim.maPhim}>
      <img className="card-img-top" src={phim.hinhAnh} alt='...' />

      <div className="card-body">
        <h4 className="card-title">{phim.tenPhim}</h4>
        <p className="card-text ">Thể Loại: {phim.theLoai}</p>
        <p className="card-text">Thời Lượng: {phim.thoiLuong}</p>
        <p className="card-text">Khởi Chiếu: {phim.khoiChieu}</p>
      </div>
      </NavLink>
      <div className="row cardButton">
      <ul >
        <li><p className="btn btn-primary"> Like {phim.like}</p></li>
        <li ><button className="btn btn-danger">Mua vé</button></li>
      </ul>
      </div>
      
    </div>}
      
    })
  }
 
  return (
    <div className="container">
      <h3>Danh Sách Phim Đang Chiếu</h3>
      <div className="row">
    
    {rederPhimSapChieu()}
      </div>
    </div>
  );
}
