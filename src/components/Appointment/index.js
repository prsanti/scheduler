import React, { Fragment } from 'react'
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => { 

    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    console.log("props:", props);
    console.log("props id", props.id);
    console.log("interview: ", interview);
    console.log("test: ", props.bookInterview(props.id, interview));
    console.log("test props: ", props.bookInterview);

    // props.bookInterview(props.id, interview)
    //   .then(() => {
    //     transition(SHOW);
    //   })
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
};