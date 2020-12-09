import React, { Fragment } from 'react'
// import classNames from 'classnames/bind';
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  console.log(props);
  return(
    <article className="appointment">
      <Header time={props.time} />
      {props.interview && (
        <>
          <Show {...props.interview}/>
        </>
      )}
      {!props.interview && (
        <>
          <Empty />
        </>
      )}
    </article>
  );
};