import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';


  export default function DayListItem(props) {

    const formatSpots = (obj) => {
      if (obj === 0) {
        return "no spots remaining"
      } else if (obj === 1) {
        return `${obj} spot remaining`
      } else {
        return `${obj} spots remaining` 
      }
    };

    let remainingSpots = formatSpots(props.spots);

    const dayClass = classnames({
      "day-list__item": true,
      "day-list__item--selected" : props.selected,
      "day-list__item--full" : !props.spots
    })  
    
    return (
      <li className={dayClass} onClick={props.setDay}>
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{remainingSpots}</h3>
      </li>
    );
  }