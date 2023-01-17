import React from 'react'
import { useSelector } from 'react-redux'

export default function Infor(props) {
  const {Component,onSubmit} = useSelector(rootReducer=> rootReducer.UserReducer);
  // let Component = props.component;
  return (
    <div>
      <Component/>

     
                {/* {Component} */}
      
    </div>
  )
}
