import axios from "axios";
import { matches, upperCase } from "lodash-es";
import { history } from "../../App";
const KV={hcm:["PanDoRa","Quận 1","Quận 2","Quận 4"],hn:["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]};
const dsFilm = [
  {
    maPhim: 1,
    tenPhim: "LYLE CHÚ CÁ SẤU BIẾT HÁT",
    gia:100000,
    daoDien: "Will Speck, Josh Gordon",
    ngonNgu: "Tiếng Anh - Phụ đề Tiếng Việt; Lồng tiếng",
    rated: "P - Phim dành cho mọi đối tượng",
    theLoai: "Hoạt Hình",
    thoiLuong: "107 phút",
    khoiChieu: "04-11-2022",
    hinhAnh: "../img/PosterFilm/poster_lyle_50x70cm_1_.jpg",
    like: "10",
    status: 1,
    moTa: "Khi gia đình Primm chuyển đến thành phố New York, cậu con trai nhỏ Josh gặp khó khăn trong việc thích nghi với ngôi trường và những người bạn mới. Mọi thứ thay đổi khi cậu bé phát hiện ra ra Lyle - một chàng cá sấu mê tắm rửa, trứng cá muối và âm nhạc sống trên gác mái của của mình. Hai người nhanh chóng trở thành bạn bè. Thế nhưng, khi cuộc sống của Lyle bị ông hàng xóm Grumps đe dọa, gia đình Primm buộc phải kết hợp với ông chủ cũ của Lyle là Hector P. Valenti (Javier Bardem) để cho cả thế giới thấy giá trị tình thân và sự kỳ diệu của một chàng cá sấu biết hát.",
    khuVuc: KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]
  },
  {
    maPhim: 2,
    tenPhim: "ĐẶC VỤ XUYÊN QUỐC GIA",
    gia:100000,
    daoDien: "Lee Seok Hoon",
    ngonNgu: "Tiếng Hàn - Phụ đề tiếng Việt",
    rated: "C16 - Phim cấm khán giả dưới 16 tuổi",
    theLoai: "Hài, Hành Động",
    thoiLuong: "129 phút",
    khoiChieu: "28-10-2022",
    hinhAnh: "../img/PosterFilm/ca-teaser-poster-vi-printing.jpg",
    like: "10",
    status: 1,
    moTa: "Câu chuyện phim ghi lại hành trình đặc vụ Triều Tiên Lim Cheol-ryung (Hyun Bin) quay trở lại Hàn Quốc để đánh sập một tổ chức tội phạm quốc tế tàn bạo, bí mật. Cùng lúc đó tại Hàn Quốc, Kang Jin-tae (Yoo Hai Jin) ở Đơn vị Tội phạm mạng đang khao khát trở lại đơn vị cũ thì được trao cho một nhiệm vụ đặc biệt với Cheol-ryung. Min-young (Lim Yoon A) cũng có cơ hội tiếp tục câu chuyện tình yêu “phát cuồng” dành cho Cheol-ryung. Jin-tae và Cheol-ryung cùng nhau làm việc dù vẫn còn nhiều nghi ngờ về động cơ của đối phương. Ngay khi bộ đôi chuẩn bị đột kích nơi ẩn náu của Jang Myung-jun (Jin Sun Kyu), thủ lĩnh của tổ chức tội phạm, thì đặc vụ FBI Jack (Daniel Henney) xông vào. Nhân tố mới này đã biến cuộc điều tra thành một cuộc điều tra quốc tế giữa 3 quốc gia, hứa hẹn nhiều tình tiết kịch tính và đầy bất ngờ.",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]
    
  },
  {
    maPhim: 3,
    tenPhim: "HARRY POTTER VÀ CHIẾC CỐC LỬA",
    gia:100000,
    daoDien: "David Yates",
    ngonNgu: "Tiếng Anh - Phụ đề Tiếng Việt",
    rated: "P - Phim dành cho mọi đối tượng",
    theLoai: "Phiêu Lưu, Thần thoại",
    thoiLuong: "150 phút",
    khoiChieu: "04-11-2022",
    hinhAnh: "../img/PosterFilm/hp4_bnr_v_dd_ka_tt_2000x3000_300dpi_en_1_.jpg",
    like: "10",
    status: 1,
    moTa: "Harry Potter (Daniel Radcliffe) bắt đầu năm học thứ năm của mình tại Hogwarts với sự u ám đáng sợ. Sau một lần sử dụng phép thuật ngoài trường, Harry đã bị trục xuất khỏi Hogwarts. Dolores Umbridge được bổ nhiệm làm giáo viên Phòng thủ Chống lại Nghệ thuật Hắc ám, với phương pháp dạy học cực kỳ tàn nhẫn. Cùng lúc đó, Voldemort dần lấy lại sức mạnh của mình, nhưng cộng đồng phù thủy vẫn không tin việc Chúa Tể Hắc Ám đã trở lại. Harry Potter phải làm gì để bảo vệ học sinh Hogwarts lẫn cộng đồng phù thủy trước hàng loạt thế lực hắc ám đang trỗi dậy?",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 4,
    tenPhim: "KHỈ CON LON TON THẾ GIỚI",
    gia:100000,
    daoDien: "Samuel Tourneux",
    ngonNgu: "Lồng tiếng Việt",
    rated: "P - Phim dành cho mọi đối tượng",
    theLoai: "Hoạt Hình",
    thoiLuong: "82 phút",
    khoiChieu: "11-11-2022",
    hinhAnh: "../img/PosterFilm/kclttg_-_main_poster_web_.jpg",
    like: "10",
    status: 1,
    moTa: "Khỉ Con luôn khát khao được chu du năm châu bốn bể và khám phá thế giới rộng lớn nhiệm màu. Nhưng vì không muốn con trai đối mặt với bất kỳ nguy hiểm nào, mẹ Khỉ Con không cho phép cậu thực hiện ước mơ đó. Một ngày nọ, nhà thám hiểm Ếch Bảnh ghé qua thị trấn nơi Khỉ Con đang sinh sống và cá cược với những cư dân nơi đây rằng mình có thể đi vòng quanh thế giới chỉ trong vòng 80 ngày. Một cách tình cờ, Khỉ Con trở thành người bạn đồng hành của Ếch Bảnh, cả hai đã cùng bắt đầu một cuộc phiêu lưu đầy bất ngờ nhưng cũng không kém phần thú vị.",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 5,
    tenPhim: "ONE PIECE FILM RED",
    gia:100000,
    daoDien: "Gorō Taniguchi",
    ngonNgu: "Tiếng Nhật - Phụ đề Tiếng Việt",
    rated: "C13 - Phim cấm khán giả dưới 13 tuổi",
    theLoai: "Hoạt Hình",
    thoiLuong: "115 phút",
    khoiChieu: "25-11-2022",
    hinhAnh: "../img/PosterFilm/keyvisual_for_promotion-01_1_.jpg",
    like: "10",
    status: 1,
    moTa: "Bối cảnh One Piece Film Red diễn ra ở hòn đảo âm nhạc Elegia, nơi diva nổi tiếng bậc nhất thế giới tên Uta thực hiện buổi biểu diễn trực tiếp đầu tiên trước công chúng. Uta đứng trên sân khấu với một ước mơ giản dị rằng ” Âm nhạc của tôi sẽ khiến cho thế giới hạnh phúc”. Đằng sau hình ảnh cô ca sĩ sở hữu giọng hát được đánh giá là ở “Đẳng cấp hoàn toàn khác” là một thân thế vô cùng bí ẩn được che giấu. Băng hải tặc Mũ Rơm và các fan khác của Uta từ nhiều thế lực khác nhau như hải tặc lẫn hải quân đều đã cùng tề tựu về buổi biểu diễn này. Biến cố bắt đầu ngay khi sự thật kinh hoàng được tiết lộ rằng Uta chính là “con gái của Shanks”. Luffy và Uta lần đầu tiên hội ngộ sau lần gặp gỡ vào 12 năm trước tại Làng Foosha.",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 6,
    tenPhim: "ĐÊM HUNG TÀN",
    gia:100000,
    daoDien: "Tommy Wirkola",
    ngonNgu: "Tiếng Anh - Phụ đề Tiếng Việt",
    rated: "",
    theLoai: "Hài, Hành Động, Tội phạm",
    thoiLuong: " ",
    khoiChieu: "02-12-2022",
    hinhAnh: "../img/PosterFilm/violent_night-700x1000px_1_.jpg",
    like: "10",
    status: 2,
    moTa: "Khi một nhóm lính đánh thuê tấn công một gia đình giàu có, ông già Noel phải bước vào để cứu họ (và lễ Giáng sinh).",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 7,
    tenPhim: "AVATAR: DÒNG CHẢY CỦA NƯỚC",
    gia:100000,
    daoDien: "James Cameron",
    ngonNgu: "Tiếng Anh - Phụ đề Tiếng Việt",
    rated: "",
    theLoai: "Hành Động, Khoa Học Viễn Tưởng, Phiêu Lưu",
    thoiLuong: " ",
    khoiChieu: "16-12-2022",
    hinhAnh: "../img/PosterFilm/avatar_2__teaser_poster_1__2.jpg",
    like: "10",
    status: 2,
    moTa: "Câu chuyện của “Avatar: Dòng Chảy Của Nước” lấy bối cảnh 10 năm sau những sự kiện xảy ra ở phần đầu tiên. Phim kể câu chuyện về gia đình mới của Jake Sully (Sam Worthington thủ vai) cùng những rắc rối theo sau và bi kịch họ phải chịu đựng khi phe loài người xâm lược hành tinh Pandora.",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 8,
    tenPhim: "CHỊ CHỊ EM EM 2",
    gia:100000,
    daoDien: "Vũ Ngọc Đãng",
    ngonNgu: "Tiếng Việt - Phụ đề Tiếng Anh",
    rated: "",
    theLoai: "Hài, Tâm Lý",
    thoiLuong: " ",
    khoiChieu: "22-01-2023",
    hinhAnh:
      "../img/PosterFilm/ch_ch_em_em_2_-_1st_look_poster_-_kc_220120223_1_.jpg",
    like: "10",
    status: 2,
    moTa: "Dựa trên giai thoại mỹ nhân Ba Trà & Tư Nhị, Chị Chị Em Em 2 xoay quanh giai đoạn 2 đệ nhất mỹ nhân Ba Trà và Tư Nhị gặp gỡ nhau, từ đó tái hiện cuộc sống hoa lệ nhiều góc khuất tại Sài thành cách đây một thế kỷ...",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
  {
    maPhim: 9,
    tenPhim: "STRANGE WORLD",
    gia:100000,
    daoDien: "Don Hall",
    ngonNgu: "Tiếng Anh - Phụ đề Tiếng Việt; Lồng tiếng",
    rated: "",
    theLoai: "Hành Động, Khoa Học Viễn Tưởng, Phiêu Lưu",
    thoiLuong: " ",
    khoiChieu: " ",
    hinhAnh: "../img/PosterFilm/swrld_007d_g_vie-vn_70x100__1_.jpg",
    like: "10",
    status: 2,
    moTa: "Strange World kể về chuyến phiêu lưu “vượt không gian và thời gian” của gia đình Clades, một gia đình tập hợp toàn những huyền thoại trong làng phiêu lưu khám phá trong chuyến đi khó nhằn nhất của họ. Chuyến đi là cuộc hành trình đến một vùng đất kỳ lạ đầy rẫy những điều bí hiểm cùng những sinh vật chưa bao giờ xuất hiện. Đây cũng có thể sẽ là chuyến hành trình mang tới nhiều điều kỳ lạ nhất của Disney tới khản giả. Nhưng dường như thế giới kì bí ấy có thể còn dễ đương đầu hơn cả những khác biệt và xung đột trong chính gia đình này.",
    khuVuc:KV,
    cumRap: ["Hồ Chí Minh", "Hà Nội"],
    cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
    cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

  },
];

export const getActionPhim = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_PHIM",
      data: dsFilm,
    });
  };
};

export const getChiTietPhim = (maPhim) => {
  // console.log (maPhim)
  
  let ctPhim = dsFilm.find((ct)=>{return ct.maPhim == maPhim});
// console.log(ctPhim);

  return (dispatch) => {
    dispatch({      
      type: "GET_CHI_TIET_PHIM",
      data: ctPhim
    });
  };
};

export const getModalChiTietPhim = (maPhim) => {
  // console.log (maPhim)
  
  let ctPhim = dsFilm.find((ct)=>{return ct.maPhim == maPhim});
// console.log(ctPhim);

  return (dispatch) => {
    dispatch({      
      type: "GET_Modal_CHI_TIET_PHIM",
      data: ctPhim
    });
  };
};



export const dangNhap = (userLogin) => {
  // console.log(userLogin)
  return (dispatch)=>{
    let result =  axios.post('http://localhost:3100/api/users/login',userLogin)
    result.then(result=>{
      
       if(result.data.kq===1){
      // luu token  vao local storage
      const user = {
        "email":result.data.data.data[0].email,
        "name" :result.data.data.data[0].name
      };
    
        localStorage.setItem('userLogin',JSON.stringify(user));
        localStorage.setItem('accessToken',result.data.data.token);
        dispatch({
          type:'DANG_NHAP',
          data:result.data.data.token,
          setTimeout: 3000,
        })
        
        history.push('/');
        // window.location.reload();
       }
       else{
        dispatch({
          type:'DANG_NHAP_SAI',
          data:result.data.err
        })
       }
    })
    result.catch((err)=>{console.log('err',err.response?.data)})
    
  }
  }

  export const Registers = (userLogin) => {
    // console.log(userLogin)
    return (dispatch)=>{
      let result =  axios.post('http://localhost:3100/api/users/regiter',userLogin)
      result.then(result=>{
        
         if(result.data.kq === 1){
          console.log("success :",result.data)
          history.push('/login');
         }
        //  else{
        //   dispatch({
        //     type:'DANG_NHAP_SAI',
        //     data:result.data.err
        //   })
        //  }
      })
      result.catch((err)=>{console.log('err',err.response?.data)})
      
    }
    }


    //action tim phim
export const searchPhim = (noidung)=>{
  let timPhim = noidung;
  let ketqua;
  let ds = dsFilm
  if(timPhim){
    // console.log(timPhim)
    ketqua = ds.filter(lists => lists.tenPhim.match(upperCase(timPhim)) )
  }
   
   return (dispatch) => {
    dispatch({      
      type: "TIM_PHIM",
      data: ketqua
    });
  };
  
  }