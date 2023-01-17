import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalMuaVe from "../../Modal/ModalMuaVe";
import { getActionPhim, getChiTietPhim, getModalChiTietPhim } from "../../redux/Actions/FilmActions";
// import { getGioHang } from "../../redux/Actions/GioHangAction";

export default function Hompage(props) {
  let { mangPhim } = useSelector((rootReducer) => rootReducer.FilmReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getActionPhim();
    dispatch(action);
  }, []);

  const rederPhimDangChieu = () => {
    // console.log(mangPhim)
    return mangPhim.map((phim, index) => {
      if (phim.status === 1) {
        return (
          <div key={index} className="card text-left col-md-3 mt-2">
            <NavLink to={`/details/` + phim.maPhim}>
              <div className="image">
              <img className="card-img-top" src={phim.hinhAnh} alt="..."  />
              </div>
              
              <div className="card-body">
                <h4 className="card-title ">{phim.tenPhim}</h4>
                <p className="card-text ">Thể Loại: {phim.theLoai}</p>
                <p className="card-text">Thời Lượng: {phim.thoiLuong}</p>
                <p className="card-text">Khởi Chiếu: {phim.khoiChieu}</p>
              </div>
            </NavLink>
            <div className="row cardButton">
              <ul>
                <li>
                  <p className="btn btn-primary"> Like {phim.like}</p>
                </li>
                <li>
                  <div>
                    {/* Button trigger modal */}
                    <button
                      type="button"
                      className="btn btn-danger "
                      data-toggle="modal"
                      data-target="#modelId"
                      onClick={()=>{
                        const action = getModalChiTietPhim(phim.maPhim);
                        dispatch(action);
                      }}
                    >
                      Mua vé
                    </button>
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    });
  };

  const rederPhimSapChieu = () => {
    return mangPhim.map((phim, index) => {
      if (phim.status === 2) {
        // console.log("khu vuc HN :", phim.khuVuc.HN)

        return (
          <div key={index} className="card text-left col-md-3 mt-2">
            <NavLink to={`/details/` + phim.maPhim}>
              <img className="card-img-top" src={phim.hinhAnh} alt="..." />

              <div className="card-body">
                <h4 className="card-title">{phim.tenPhim}</h4>
                <p className="card-text ">Thể Loại: {phim.theLoai}</p>
                <p className="card-text">Thời Lượng: {phim.thoiLuong}</p>
                <p className="card-text">Khởi Chiếu: {phim.khoiChieu}</p>
              </div>
            </NavLink>
            <div className="row cardButton">
              <ul>
                <li>
                  <p className="btn btn-primary"> Like {phim.like}</p>
                </li>
                <li>
                  <button className="btn btn-danger">Mua vé</button>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    });
  };
  return (
    <div className="container">
      <NavLink to={"/phimdangchieu"}>
        <h3>Danh Sách Phim Đang Chiếu</h3>
      </NavLink>

      <div className="row">{rederPhimDangChieu()}</div>
      <NavLink to={"/PhimSapChieu"}>
        <h3>Danh Sách Phim Sắp Chiếu</h3>
      </NavLink>

      <div className="row">{rederPhimSapChieu()}</div>
      <ModalMuaVe />
      
    </div>
  );
}
