import React, { useEffect, useState } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
//import {getAppointmentsForDay} from "../helpers/selectors.js";
import getAppointmentsForDay from "../helpers/selectors.js"

import axios from "axios";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const oldAppointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Spongebob Squarepants",
      interviewer: {
        id: 2,
        name: "Tori Malcom",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm"
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Patrick Star",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {oldAppointments},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState({...state, days});

  // useEffect(() => {
  //   const daysUrl = "/api/days";
  //   axios.get(daysUrl)
  //     .then(response => {
  //       setState(prev => ({ ...prev, days: response.data }));
  //     })
  // }, [setDays]);

  const getDays = () => {
    return axios.get("http://localhost:8001/api/days");
  };
  const getAppointments = () => {
    return axios.get("http://localhost:8001/api/appointments");
  };
  const getInterviewers = () => {
    return axios.get("http://localhost:8001/api/interviewers");
  };

  Promise.all([
    // Promise.resolve(getDays()),
    // Promise.resolve(getAppointments()),
    // Promise.resolve(getInterviewers()),
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    // console.log(all[0].data); // first
    // console.log(all[1].data); // second
    // console.log(all[2].data); // third
  
    // const [first, second, third] = all;
    // console.log(all[1].data);
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      //, interviewers: [all[2].data] }));
  });
  // console.log(state.day);
  // console.log({"days": [state.days], "appointments": [state.appointments]});
  // const test = {"days": [state.days], "appointments": [state.appointments]}; 
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          return <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
