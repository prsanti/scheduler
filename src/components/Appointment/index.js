import React from 'react'
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save interview function
  // transition to saving card, then books the interview and shows it
  const save = (name, interviewer) => { 
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };
 
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  // delete interview function
  const destroy = (name, interviewer) => {
    transition(DELETING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  // confirm changes
  const confirm = () => {
    transition(CONFIRM);
  };

  // edit function
  const edit = () => {
    transition(EDIT);
  };

  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)}
        />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?" onConfirm={destroy} onCancel={back} />}
      {mode === EDIT && <Form name={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back} />}
    </article>
  );
}