import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalMuaVe from "../../Modal/ModalMuaVe";
import { getChiTietPhim, getModalChiTietPhim } from "../../redux/Actions/FilmActions";

export default function Details(props) {
  const { chiTietPhim } = useSelector((rootReducer) => rootReducer.FilmReducer);

  const dispatch = useDispatch();
  let maPhim = props.match.params.maPhim;
  // console.log (maPhim);

  useEffect(() => {
    const action = getChiTietPhim(maPhim);
    dispatch(action);
  }, []);
  //  console.log(chiTietPhim);
  return (
    <div className="container pt-5 pb-5">
      <div className="row" style={{ display: "flex" }}>
        <div className="col-md-3 p-0">
          <img
            src={chiTietPhim.hinhAnh}
            alt="..."
            style={{ width: "100%", height: "350px" }}
          />
        </div>
        <div className="col-md-9">
          <h1>{chiTietPhim.tenPhim}</h1>
          <p>
            <b>Đạo diễn: </b>
            {chiTietPhim.daoDien}
          </p>
          <p>
            <b>Thể loại: </b>
            {chiTietPhim.theLoai}
          </p>
          <p>
            <b>Khởi chiếu: </b>
            {chiTietPhim.khoiChieu}
          </p>
          <p>
            <b>Thời lượng: </b>
            {chiTietPhim.thoiLuong}
          </p>
          <p>
            <b>Ngôn ngữ: </b>
            {chiTietPhim.ngonNgu}
          </p>
          <p>
            <b>Rated: </b>
            {chiTietPhim.rated}
          </p>
          <div className="row cardButton">
            <ul>
              <li className="col-2">
                <p className="btn btn-primary "> Like {chiTietPhim.like}</p>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-danger "
                  data-toggle="modal"
                  data-target="#modelId"
                  onClick={() => {
                    const action = getModalChiTietPhim(chiTietPhim.maPhim);
                    dispatch(action);
                  }}
                >
                  Mua vé
                </button>
                <ModalMuaVe/>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row pt-3">
        <div className="col-12 " style={{ textAlign: "center" }}>
          Chi Tiết
        </div>
        {chiTietPhim.moTa}
      </div>
    </div>
  );
}
