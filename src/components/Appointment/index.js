import React, { Fragment } from 'react'
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETE = "DELETE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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
 
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  };

  const deleteInterview = (name, interviewer) => {
    transition(DELETING);

    const interview = {
      student: name,
      interviewer
    };

    props.deleteInterview(props.id, interview)
      .then(() => transition(EMPTY))
  };

  const confirm = () => {
    transition(CONFIRM);
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
          onDelete={confirm}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?" onConfirm={deleteInterview} onCancel={back} />}
    </article>
  );
};