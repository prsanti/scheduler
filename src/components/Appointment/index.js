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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) { 

    const interview = {
      student: name,
      interviewer
    };

    console.log("props id", props.id);
    console.log("interview: ", interview);
    console.log("test: ", props.bookInterview(props.id, interview));
    console.log(props.bookInterview);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

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
      {mode === CREATE && <Form name="" interviewers={props.interviewers} interviewer={props.interview} onSave={save} onCancel={back} />}
    </article>
  );
};