import React from "react"
import InforUsers from "../../components/Pages/Users/InforUsers";


const stateDefault = {
    Component : InforUsers,
    onSubmit : ()=>{
        console.log('submit default')
    }
}

export const UserReducer = (state = stateDefault, action)=>{
    switch(action.type){
        case "INFOR_USERS" :{
            state.Component = action.Component;
            state.onSubmit = action.onSubmit;
            return{...state}
        }
        case "CHI_TIET_USERS" :{
            state.Component = action.Component;
            state.onSubmit = action.onSubmit;
            return{...state}
        }
       
        default: return state;
    }
}