import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';

const spotsRemaining = (spots) => {
  if (spots === 1) {
    return `${spots} spot remaining`;
  } else if (spots > 1) {
    return `${spots} spots remaining`;
  } else {
    return `no spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
  });

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
        <h2 className="text--regular">{props.name}</h2> 
        <h3 className="text--light">{spotsRemaining(props.spots)}</h3>
    </li>
  );
}