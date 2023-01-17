import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function ModalGiohang(props) {
  let mangGioHang = useSelector((rootReducer) => rootReducer.GioHangReducer);
  // console.log()
// số lượng vé đã mua
  const soVe = () => {
    let soLuongPhim = 0,
      SL;
    for (var i = 0; i < mangGioHang.Giohang.length; i++) {
      SL = mangGioHang.Giohang[i].soLuong;
      soLuongPhim = SL + soLuongPhim;
    }

    if (soLuongPhim > 0) {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Gio hang ({soLuongPhim})
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          disabled
        >
          Gio hang
        </button>
      );
    }
  };

  const renderGioHang = () => {
    if (mangGioHang.Giohang) {
      return mangGioHang.Giohang.map((phim, index) => {
        return (
          <NavLink key={index} to = {`/details/${phim.maPhim}`}>
            <div key={index}
              className="modal-title row mt-2 inFor-GioHang"
              id="exampleModalLabel"
            >
              <div className="col-2">
                <img className="infor-img" src={phim.hinhAnh} alt="..." />
              </div>
              <div className="col-7 inFor-Phim">
                <div>Tên phim: {phim.tenPhim}</div>
                <div>
                  <div>Giá vé: {phim.gia * phim.soLuong}</div>
                  <div>Số Lượng : {phim.soLuong}</div>
                  <div>Ngày Mua : {phim.ngay.format("MMM DD YYYY")}</div>
                </div>
                <div>Khu Vục : {phim.cumRap}</div>
                <div>
                  Rạp:
                  {phim.cumRapHCM} {phim.cumRapHN}
                </div>
              </div>
            </div>
           </NavLink>
        );
      });
    } else {
      return (
        <h5 className="modal-title" id="exampleModalLabel">
          Chưa có vé
        </h5>
      );
    }
  };

  //tính tiền
  const tongTien = () => {
    let tongTien = 0,
      SL;
    for (var i = 0; i < mangGioHang.Giohang.length; i++) {
      SL = mangGioHang.Giohang[i].soLuong;
      tongTien = SL * mangGioHang.Giohang[i].gia + tongTien;
    }
    return (
      <NumericFormat
        className="btn btn-primary"
        type="button"
        value={tongTien}
        allowLeadingZeros
        thousandSeparator=","
        displayType="text"
        renderText={(value) => <b>{value}</b>}
      />
    );
  };

  return (
    <div>
      {/* modal gio hang */}
      <div>
        {soVe()}
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body container">{renderGioHang()}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Thanh Toan :{tongTien()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
