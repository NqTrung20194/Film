import React, { useState } from "react";
import range from "lodash-es/range";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { ngayMuaVe } from "../../../redux/Actions/GioHangAction";

export default function Calendar() {
  const [dayObj, setDayObj] = useState(dayjs());
  const [testDayObj, settestDayObj] = useState(dayjs());
  // console.log(testDayObj.format("MMM DD YYYY"))
  // console.log(testDayObj.month())
  const dispatch = useDispatch()
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const todayObj = dayjs();
  const Calendar = () => {
    
    

    const thisYear = dayObj.year();
    const thisMonth = dayObj.month(); // (January as 0, December as 11)
    const daysInMonth = dayObj.daysInMonth();
    // console.log(dayObj.month())
    // console.log(dayObj.month())
    const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
    const weekDayOf1 = dayObjOf1.day(); // (Sunday as 0, Saturday as 6)
    const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  // console.log(dayObjOfLast)

    const weekDayOfLast = dayObjOfLast.day();

    const handlePrev = () => {
      setDayObj(dayObj.subtract(1, "month"));
      settestDayObj(testDayObj.month(dayObj.month()))
      console.log(testDayObj.month())
    };

    const handleNext = () => {
      setDayObj(dayObj.add(1, "month"));
      settestDayObj(testDayObj.month(dayObj.month()+1))
      
      

    };
    return (
      <div className="container calenDar">
        <div className="calendar">
        <div className="week">
        <div className="header row pt-2">
          <div className="col-3">
          <button type="button" className="btn btn-secondary" style={{width:"50%"}} onClick={handlePrev}>
            &lt;
          </button>
          </div>

         <div className="col-6">
          <div className="datetime ">{dayObj.format("MMM DD YYYY")}</div>
          </div>
          
          
          <div className="col-3">
          <button type="button" className="btn btn-secondary " style={{width:"50%"}} onClick={handleNext}>
            &gt;
          </button>
          </div>
         
        </div>
        </div>
        
        <div className="week">
        <div className=" row">
          {weekDays.map((d) => (
            <div className="week-cell " key={d}>
              {d}
            </div>
          ))}
        </div>
        </div>
        <div className="week">
        <div className="day-container row">
          {range(weekDayOf1).map((i) => (
            <div className="day-cell day-cell--faded " key={i} >
              {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
            </div>
          ))}

          {range(daysInMonth).map((i) => (
            
                <div
              className={`day-cell day-cell--in-month${
                i + 1 === todayObj.date() &&
                thisMonth === todayObj.month() &&
                thisYear === todayObj.year()
                  ? " day-cell--today"
                  : ""
              }
              ${(i+1)===testDayObj.date()? "active":""}
              ${i + 1 < todayObj.date() &&
                thisMonth === todayObj.month() &&
                thisYear === todayObj.year()
                  ? " day-cell--faded"
                  : ""}
              `}
              
              key={i}
              onClick={()=>{
               
                  // set ngày mua vé

                  settestDayObj(testDayObj.date(i+1))

                  // console.log(testDayObj.month())
                  const action = ngayMuaVe(testDayObj.date(i+1));
                  dispatch(action);
                
               
              }}
            >
              {i + 1}
            </div>
            
            
          ))}

          {range(6 - weekDayOfLast).map((i) => (
            <div className="day-cell day-cell--faded" key={i}>
              {dayObjOfLast.add(i + 1, "day").date()}
            </div>
          ))}
        </div>
        </div>
        
      </div>
      </div>
      
    );
  };
useState(
  ()=>{
    const action = ngayMuaVe(dayjs());
                  dispatch(action);
  }
)
  return <div>{Calendar()}</div>;
}
