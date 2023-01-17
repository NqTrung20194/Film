import React from "react";
import Buttons from "react-bootstrap-sweetalert/dist/components/Buttons";
import { useSelector } from "react-redux";

export default function InforUsers(props) {
  return (
    <div className="m-1 infor">
      <div className="row">
        <div className="col-8 row">
          <div className="col-12">
            <img src="https://i.pravatar.cc/300" alt="..." width={120} />
          </div>
          <div className="col-12 ">
            <button className="btn btn-primary m-3">Thay doi</button>
          </div>
        </div>
      </div>
      {/* thong tin */}
      <div className="row">
        <div className="col-12">
        <h5>Xin chào Trung Nguyễn,</h5><br/>
        <p>
          Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của
          mình.
        </p>
        </div>
      </div>
      <div className="row inForUserTable">
        <div className="col-4 text-secondary ">
          <div>Cap do the:  Member</div>
          <div>tong chi tieu: o</div>
          <div>diem CGV: 0</div>
        </div>
        <div className="col-2 text-dark m-0 itemBox">
          <div>The qua tang</div>
          <div>0d</div>
          <div><span className="icon-acc-add">Xem</span></div>
        </div>
        <div className="col-2 text-dark m-0 itemBox">
          <div>Voucher</div>
          <div>0</div>
          <div><span className="icon-acc-add">Xem</span></div>
        </div>
        <div className="col-2 text-dark m-0 itemBox">
          <div>Coupon</div>
          <div>0</div>
          <div><span className="icon-acc-add">Xem</span></div>
        </div>
        <div className="col-2 text-dark m-0 itemBox">
          <div>The thanh vien</div>
          <div>1</div>
          <div><span className="icon-acc-add">Xem</span></div>
        </div>        
      </div>

      {/* thong tin tai khoan */}
      <div className="row inforUser" >
        <div className="col-12">THONG TIN TAI KHOAN</div>
        <div className="col-12">
          <div>
          <h6 className="item" >LIEN HE</h6>
          <button className="item btn btn-secondary">Thay doi</button>
          </div>
        </div>
        <div className="col-12">
          <p>Ten: Trung</p>
          <p>Email: Trung@gmail.com</p>
          <p>Ten dang nhap: Trung@gmail.com</p>
          <p>Dien thoa: 0773xxxxxx</p>
        </div>
      </div>
    </div>
  );
}
