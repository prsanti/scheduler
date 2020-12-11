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
  // if no day found return []
  if (!dayFound) {
    return [];
  }
  // get interviewers list for that day
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);

  let interviewerIds = [];
  // create a list of interviewer id's for the day
  for (const appointment of appointments) {
    if (appointment.interview) {
      interviewerIds.push(appointment.interview.interviewer);
    }
  }

  // remove duplicate interviewer id's 
  // source: https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
  interviewerIds = [...new Set(interviewerIds)];
  interviewerIds.filter((item, index) => interviewerIds.indexOf(item) === index);
  interviewerIds.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
  
  // replace every interviewer id with the interviewer's info
  const interviewers = interviewerIds.map(interviewerId => state.interviewers[interviewerId]);

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