import React, { Fragment } from 'react'
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  // console.log(props);
  // props.interviewers = [];

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => {
        console.log("Clicked onAdd")
        transition(CREATE);
        }}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* temporality setting props.interviewers to [] */}
      {mode === CREATE && <Form name="" interviewers={[]} interviewer={null} onCancel={back} />}
    </article>
  );
};