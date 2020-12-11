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
  const result = {};
  if (!interview){
    return null;
  }
  const interviewerId = interview.interviewer;
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];
  return result;

};

export {getAppointmentsForDay, getInterview};