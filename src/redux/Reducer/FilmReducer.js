
let usLogin = {};
if(localStorage.getItem('userLogin')){
    // lay ra
    usLogin = JSON.parse(localStorage.getItem('userLogin'));
    // console.log('usLongin:',usLogin)

}
let HCM = ["PanDoRa","Quận 1","Quận 2","Quận 4"];
let HN = ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

const stateDefault = {
    mangPhim :[{
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
        khuVuc:[["PanDoRa","Quận 1","Quận 2","Quận 4"],["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]],
        cumRap: ["Hồ Chí Minh", "Hà Nội"],
        cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
        cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

      }],
    chiTietPhim:{
        maPhim: 1,
        tenPhim: "LYLE CHÚ CÁ SẤU BIẾT HÁT ",
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
        khuVuc:[["PanDoRa","Quận 1","Quận 2","Quận 4"],["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]],
        cumRap: ["Hồ Chí Minh", "Hà Nội"],
        cumRapHCM:["PanDoRa","Quận 1","Quận 2","Quận 4"],
        cumRapHN : ["Từ Liêm","Cầu Giấy","Hoàng Mai","Đống Đa"]

      },
    userLogin:usLogin,
    token:{},
    errTK:null,
    searchArr:null,
    modalChiTietPhim:null
}



export const FilmReducer = (state = stateDefault,action)=>{
    switch (action.type){
        case 'GET_PHIM' :{
            state.mangPhim = action.data;
            // let arr =state.mangPhim[0].khuVuc.HCM.Quan1;
            // console.log("Mang phim :",arr);
            return{...state};
        }
        case 'GET_CHI_TIET_PHIM':{
            // setState(chiTietPhim = action.data)
            state.chiTietPhim = action.data;
            // console.log(state.chiTietPhim )
            return{...state}
        }
        case 'GET_Modal_CHI_TIET_PHIM':{
            // setState(chiTietPhim = action.data)
            state.modalChiTietPhim = action.data;
            // console.log(state.chiTietPhim )
            return{...state}
        }
        case 'DANG_NHAP':{
            // console.log(action.data)
            state.token = action.data;
            state.userLogin = JSON.parse(localStorage.getItem('userLogin'));

            // state.userLogin = usLogin;
           return {...state}
           
        }
        case 'DANG_NHAP_SAI':{
            // console.log('data:',action.data);
            state.errTK = action.data;
            // alert(action.data);
            
           return {...state} 
        }

        case 'TIM_PHIM':{
            
            state.searchArr = action.data;
            // alert(action.data);
            console.log('data:',action.data);
           return {...state} 
        }
        
        default : return{...state}
    }
};

