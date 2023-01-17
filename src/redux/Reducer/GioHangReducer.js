import React from "react"


const stateDefault = {
    Giohang:'',
}

export const GioHangReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case "GET_GIO_HANG" : {
            state.Giohang = action.data
            // console.log("Giỏ hàng:",state.Giohang)
            return{...state}
            
        }
        case "GET_Ngay" : {
            // state.Giohang = action.data
            // console.log("Giỏ hàng:",action.data)
            // return{...state}
            
        }
       
        default: return state;
    }
}