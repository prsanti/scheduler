import React from "react";
import classNames from 'classnames/bind';
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewListItem"

// props contain:
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

export default function InterviewerList(props) {

  const InterviewerListItems = props.interviewers.map((interviewer, index) => {
    return <InterviewerListItem
              key={index}
              id={props.interviewer}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={props.interviewer === interviewer.id}
              setInterviewer={props.setInterviewer}
          />
  });

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItems}</ul>
    </section>
  );
};