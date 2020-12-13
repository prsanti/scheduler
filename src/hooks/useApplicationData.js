import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers")
  ]).then((all) => {
    setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state, 
      appointments
    });

    return axios.put(`/api/appointments/${id}`, { interview: interview });
  };

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.delete(`/api/appointments/${id}`, { interview: interview })
  };

  return { state, setDay, bookInterview, cancelInterview };
};