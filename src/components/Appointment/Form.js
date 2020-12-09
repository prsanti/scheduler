/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  // const handleNameChange = () => {
  //   setName(document.getElementById("test"));
  // };
  // console.log(handleNameInput());

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            id={"test"}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
            value={name}
            //onChange={handleNameChange}
            onChange={event => {

              setName(event.target.value)

            }}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={props.interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
}