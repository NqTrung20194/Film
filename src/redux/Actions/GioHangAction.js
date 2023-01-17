const gioHang = [];
let Days ;

//action mua ve
export const ngayMuaVe = (days)=>{
  // let ngayMua = days;
  Days = days;
// console.log(Days) 

return (dispatch) => {
  dispatch({      
    type: "GET_Ngay",
    data: Days
  });
};
}

export const getGioHang = (phim) => {
  // console.log(phim)
  
  let flag = 0;
  let spClick = { ...phim, soLuong: 1 ,ngay : Days};
  // kiêm tra tên sp trong giỏ hàng
  let testGioHang = gioHang.find((sp) => sp.maPhim === spClick.maPhim && sp.cumRap === spClick.cumRap);
  // console.log(spClick.cumRapHCM)
  
  if(testGioHang){
    //không có cụm rạp HCM
    if(spClick.cumRapHCM  === null){
      console.log("test cum HN");
      let testcumRap = gioHang.find((sp) => sp.cumRapHN === spClick.cumRapHN);
      // test vé có mua cùng cụm rạp và rạp
      if(testcumRap){
        flag = 1
      }
    }else{
    //không có cụm rạp HN
      // console.log("test cum HCM");
      let testcumRap = gioHang.find((sp) => sp.cumRapHCM === spClick.cumRapHCM);
      // test vé có mua cùng cụm rạp và rạp
      if(testcumRap){
        flag = 1
      }
    }
    let testNgay = gioHang.find((day)=>day.ngay.date()=== spClick.ngay.date() && day.ngay.month()=== spClick.ngay.month()&&day.ngay.year()=== spClick.ngay.year())
    if(testNgay){
      // console.log("cung ngay")
    }else{
      flag =0;
      // console.log("khac ngay")
    }
  }
  if (flag === 1) {
    testGioHang.soLuong += 1;
  } else {
    gioHang.push(spClick);
  }

  // console.log(gioHang);

return (dispatch) => {
    dispatch({      
      type: "GET_GIO_HANG",
      data: gioHang
    });
  };
};


