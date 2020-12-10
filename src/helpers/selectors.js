function getAppointmentsForDay(state, day) {
  // get the day object
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  // console.log(dayFound);
  //  ==> { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }

  // if no day found return []
  if (!dayFound) {
    return [];
  }
  // get appointments objects for that day
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);

  return appointments;
};

function getInterview(state, interview) {
  let interviewerId = null;
  if (!interview) {
    return null;
  } else {
    interviewerId = interview.interviewer;
  }

  let interviewerObj = null;
  // // interview === interview: { student: "Archie Cohen", interviewer: 2 }

  for (const key in state.interviewers) {
    if (state.interviewers[key].id === interviewerId) {
      console.log(interviewerId);
      interviewerObj = state.interviewers[key];
    }
  }

  for (const key in state.appointments) {
    if (state.appointments[key].interview) {
      if (state.appointments[key].interview.interviewer === interviewerId) {
        state.appointments[key].interview.interviewer = interviewerObj;
        return state.appointments[key].interview;
      }
    }
  }
};

export {getAppointmentsForDay, getInterview};