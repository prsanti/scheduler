function getAppointmentsForDay(state, day) {
  // let appointmentsList = [];
  // for (const days of state.days) {
  //   if (days.name === day) {
  //     appointmentsList = days.appointments;
  //   }
  // }
  // const appointmentsListDetails = [];
  // appointmentsList.forEach(appointment => {
  //   for (const key in state.appointments) {
  //     if (appointment === state.appointments[key].id) {
  //       appointmentsListDetails.push(state.appointments[key]);
  //     }
  //   }
  // });
  // return appointmentsListDetails;

  // get the day object
  const dayFound = state.days.find(currentDay => currentDay.name === day);

  // if no day found return []
  if (!dayFound) {
    return [];
  }

  // get appointments objects for that day
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);

  return appointments;
};

function getInterview(state, interview) {
  // let newState = {...state};
  // const interviewerId = interview.interviewer || null;
  // console.log("interviewer id: ", interviewerId);

  // let interviewerObj = null;
  // // interview === interview: { student: "Archie Cohen", interviewer: 2 }
  // console.log("new state test: ", newState.interviewers)
  // for (const key in newState.interviewers) {
  //   // console.log('test');
  //   // console.log("for loop test: ", newState.interviewers[key]["id"])
  //   if (newState.interviewers[key].id === interviewerId) {
  //     console.log("test");
  //     interviewerObj = newState[key].interviewers
  //   }
  // }

  // console.log ("obj: ", interviewerObj);

  // for (const appointmentsKey in newState.appointments) {
  //   if (newState.appointments.appointmentsKey.interview.interviewer === interview) {
  //     newState.appointments.appointmentsKey.interview.interviewer = interviewerObj;
  //   }
  // }

  // return newState.appointments.;
 // get the day object
//  const interviewerId = state.days.find(currentDay => currentDay.name === day);

//  // if no day found return []
//  if (!dayFound) {
//    return [];
//  }

 // get appointments objects for that day
 const interviewers = dayFound.interviewers.map(interviewersId => state.appointments[interviewersId]);

 return interviewers;

};

export {getAppointmentsForDay, getInterview};