import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../components/Pages/Functions/Calendar";
import { getGioHang } from "../redux/Actions/GioHangAction";

export default function ModalMuaVe(props) {
  //Lấy infor film
  let { modalChiTietPhim } = useSelector((rootReducer) => rootReducer.FilmReducer);
  // console.log(modalChiTietPhim);
  const dispatch = useDispatch();
  const [stateCumRap, setStateCumRap] = useState(null);
 
  const [ve, setVe] = useState({
    cumRap: null,
    ["cumRapHCM"]: null,
    ["cumRapHN"]: null,
  });
  // console.log(ve)

  const khuVuc = () => {
    // console.log(modalChiTietPhim.cumRap)
    if (modalChiTietPhim !== null) {
      return modalChiTietPhim.cumRap.map((KV, index) => {
        
        return (
          <button
            key={index}
            to={"/"}
            className={KV === ve.cumRap ? "text active" : "text"}
            onClick={() => {
              if (KV === "Hồ Chí Minh") {
                setStateCumRap(modalChiTietPhim.cumRapHCM);
                // tao du lieu cho ve xem phim
                setVe({ ...ve, ["cumRap"]: KV });
              } else {
                setStateCumRap(modalChiTietPhim.cumRapHN);
                // tao du lieu cho ve xem phim
                setVe({ ...ve, ["cumRap"]: "Hà Nội" });
              }
            }}
          >
            {KV}
          </button>
        );
      });
    }
  };

  const rapPhim = () => {
    // console.log(cumRap)
    if(stateCumRap){
      return stateCumRap.map((KV, index) => {
        return (
          <button
            key={index}
            to={"/"}
            className={
              KV === ve.cumRapHCM || KV === ve.cumRapHN ? "text active" : "text"
            }
            onClick={() => {
              if (ve.cumRap === "Hồ Chí Minh") {
                setVe({
                  ...ve,
                  ["cumRapHCM"]: KV,
                  ["cumRapHN"]: null,
                });
              } else {
                setVe({
                  ...ve,
                  ["cumRapHCM"]: null,
                  ["cumRapHN"]: KV,
                });
              }
            }}
          >
            {KV}
          </button>
        );
      });
    }
    
  };

  const tenPhim = ()=>{
    if(modalChiTietPhim !== null){
      return modalChiTietPhim.tenPhim
    }
  }

  return (
    <div>
      {/* Modal Mua Ve */}
      <div
        className="modal fade"
        id="modelId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Thông Tin Vé</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Ngày chiếu */}
              <div>
                <Calendar />
              </div>

              {/* tem phim */}
              <div className="mt-2">
                <h3> Tên phim : {tenPhim()}</h3>
              </div>
              {/* Khu vực */}
              <div>
                <div className="site">
                  <h3>Khu vực</h3>

                  {khuVuc()}
                </div>
              </div>
              {/* Rạp */}
              <div className="rap">
                <h3>Rạp</h3>
                {rapPhim()}
              </div>

              {/* Giờ chiếu */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-danger"
                data-dismiss="modal"
                disabled={
                  ve.cumRap === null ||
                  (ve.cumRapHCM === null && ve.cumRapHN === null)
                    ? true
                    : false
                }
                onClick={() => {
                  //gui du lieu cho gio hang
                  const saveVe = {
                    ...modalChiTietPhim,
                    ["cumRap"]: ve.cumRap,
                    ["cumRapHCM"]: ve.cumRapHCM,
                    ["cumRapHN"]: ve.cumRapHN,
                  };
                  // console.log(saveVe)
                  const action = getGioHang(saveVe);
                  dispatch(action);
                }}
              >
                Mua vé
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
