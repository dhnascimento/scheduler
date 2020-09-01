import React from "react";
import DayListItem from "./DayListItem"
import classnames from 'classnames';


  export default function DayList(props) {
    const dayItems = props.days.map(day => {
      return (
        <DayListItem 
          key={day.id}
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={event => props.setDay(day.name)}  
        />
      );
    });
    
    return (
    <ul>{dayItems}</ul>
    );
  }