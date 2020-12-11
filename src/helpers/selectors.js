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

function getInterviewersForDay(state, day) {
  // get the day object
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  //  ==> { id: 1, name: 'Monday', appointments: [ 1, 2, 3 ] }

  // if no day found return []
  if (!dayFound) {
    return [];
  }
  // get interviewers list for that day
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  // console.log(appointments);
  // console.log 
  // [ { id: 1, time: '12pm', interview: null },
  // { id: 2, time: '1pm', interview: null },
  // { id: 3,
  //   time: '2pm',
  //   interview: { student: 'Archie Cohen', interviewer: 2 } } ]

  // [ { id: 4, time: '3pm', interview: null },
  // { id: 5,
  //   time: '4pm',
  //   interview: { student: 'Chad Takahashi', interviewer: 2 } } ]

  let interviewerIds = [];
  //const interviewerInfo = appointments.every(interviewers.push(interview));
  // create a list of interviewer id's for the day
  for (const appointment of appointments) {
    if (appointment.interview) {
      interviewerIds.push(appointment.interview.interviewer);
    }
  }
  // ==> [2]

  const interviewers = interviewerIds.map(interviewerId => state.interviewers[interviewerId]);
  console.log(interviewers);

  return interviewers;
};

function getInterview(state, interview) {
  const result = {};
  if (!interview){
    return null;
  }
  const interviewerId = interview.interviewer;
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];
  return result;

};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };