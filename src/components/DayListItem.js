import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {

  const spots = props.spots;
  const spotsRemaining = () => {
    if (spots === 1) {
      return `${spots} spot remaining`;
    } else if (spots > 1) {
      return `${spots} spots remaining`;
    } else {
      return `No spots remaining`;
    }
  };
  // console.log("test", spots);
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
  });

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{spotsRemaining()}</h3>
    </li>
  );
}