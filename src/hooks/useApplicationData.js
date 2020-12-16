import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days];
    // checks if there is no appointment for each time slot
    days.map(day => {
      day.appointments.map(appointment => {
        // if the new appointment is equal to the id, change the state of spots
        // also checks if the appointment already exists when editing
        if (id === appointment && !state.appointments[id].interview) {
          const newDaySpots = day.spots - 1;
          day.spots = newDaySpots;
        }
      })
    });
    
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state, 
          appointments,
          days
        });
      })
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

    const days = [...state.days];
    // checks if there is no appointment for each time slot
    days.map(day => {
      day.appointments.map(appointment => {
        // if the new appointment is equal to the id, change the state of spots
        if (id === appointment) {
          const newDaySpots = day.spots + 1;
          day.spots = newDaySpots;
        }
      })
    });

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};