import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ModalGiohang from "../../Modal/ModalGiohang";
import { getChiTietPhim, searchPhim } from "../../redux/Actions/FilmActions";

export default function HeaderHome(props) {
  const userLogin = useSelector((rootReducer) => rootReducer.FilmReducer);
  const {searchArr} = useSelector((rootReducer) => rootReducer.FilmReducer);
  // console.log("searchArr:",searchArr)
  const dispatch = useDispatch();

  const renderButtonLogin = () => {
    if (userLogin.userLogin.email) {
      return (
        <div className="dropdown-item bg_li">
          <NavLink to={"/userdetails"}>
            xin chao : {userLogin.userLogin.email}
          </NavLink>
          <button
            className="btn btn-danger ml-2"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
              window.location.href = "/";
            }}
          >
            sig out
          </button>
        </div>
      );
    } else {
      // console.log("khong co data");
      return (
        <NavLink className="dropdown-item bg_li" to={"/login"}>
          Tài Khoản
        </NavLink>
      );
    }
  };
const [noidung,setNoiDung]= useState(null)

const Search = ()=>{
  if(noidung !== null){
    let noiDung = noidung.Search
    const action = searchPhim(noiDung)
    dispatch(action)
  }
  
  }

  const handelSearch = (event)=>{
    let {value,name}=event.target;
    // console.log(event.target.value.trim())
    setNoiDung({
      ...noidung,
      [name]:value,
    })
    Search()
    
  }

 

  const mangPhim = ()=>{
    if(searchArr){
      if(searchArr !== null){
        return (
          <div className={`popuptext ${(noidung.Search.trim()!=="")?"show":""}`}>
            {searchArr.map((phim,index)=>{
          return(
            <div key={index} className="card text-left mt-2">
              <NavLink className="row" to={`/details/` + phim.maPhim}>
                <div className="col-3">
                <img className="card-img-top" src={`../${phim.hinhAnh}`} alt="..."  />
                </div>
                
                <div className="card-body col-9">
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
                        // data-dismiss="modal"
                        onClick={()=>{
                          const action = getChiTietPhim(phim.maPhim);
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
          )
        })}
         </div>
        )
      }
      
      
    }
  }


  return (
    <div className="row bg_head">
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light  col-12">
          <NavLink to={"/"}>
            <img
              className="navbar-brand rounded-circle"
              src="../img/Logo/Logo.png"
              width={100}
              height={100}
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown bg_li">
                <p
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Phim
                </p>
                <div
                  className="dropdown-menu bg_li"
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink
                    className="dropdown-item bg_li"
                    to={"/phimdangchieu"}
                  >
                    Phim Đang Chiếu
                  </NavLink>
                  <NavLink className="dropdown-item" to={"/PhimSapChieu"}>
                    Phim Sắp chiếu
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown bg_li">
                <p
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Rap
                </p>
                <div
                  className="dropdown-menu bg_li"
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink className="dropdown-item bg_li" to={"/"}>
                    Tất Cả Các Rạp
                  </NavLink>
                  <NavLink className="dropdown-item" to={"/"}>
                    Rạp Đặc Biệt
                  </NavLink>
                  <NavLink className="dropdown-item" to={"/"}>
                    Rạp 3D
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown bg_li">
                <p
                  className="nav-link dropdown-toggle"
                  // to={"/login"}
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Thành Viên
                </p>
                <div
                  className="dropdown-menu bg_li"
                  aria-labelledby="navbarDropdown"
                >
                  {renderButtonLogin()}

                  <NavLink className="dropdown-item" to={"/"}>
                    Quyền Lợi
                  </NavLink>
                </div>
              </li>
              
            </ul>
            <form className="form-inline my-2 my-lg-0 ">
              <div className="popup">
              <input
                className="form-control mr-sm-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="Search"
                onChange = {handelSearch}
              />
              
              {mangPhim()}
              </div>
              
              
              <div className="ml-1">
              <ModalGiohang />
              </div>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}
