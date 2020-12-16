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
}

function getInterviewersForDay(state, day) {
  // get the day object
  const dayFound = state.days.find(currentDay => currentDay.name === day);
  // if no day found return []
  if (!dayFound) {
    return [];
  }

  // get interviewers list for that day
  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  // console.log(interviewers);

  let interviewerIds = [];
  // create a list of interviewer id's for the day
  interviewers.map(interviewer => {interviewerIds.push(interviewer.id)});
  
  // // replace every interviewer id with the interviewer's info
  const interviewersList = interviewerIds.map(interviewerId => state.interviewers[interviewerId]);

  return interviewersList;
}

function getInterview(state, interview) {
  const result = {};
  if (!interview){
    return null;
  }
  const interviewerId = interview.interviewer;
  result.student = interview.student;
  result.interviewer = state.interviewers[interviewerId];
  return result;

}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };