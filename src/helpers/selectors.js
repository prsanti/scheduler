export default function getAppointmentsForDay(state, day) {
  let appointmentsList = [];
  for (const days of state.days) {
    if (days.name === day) {
      appointmentsList = days.appointments;
    }
  }
  const appointmentsListDetails = [];
  appointmentsList.forEach(appointment => {
    for (const key in state.appointments) {
      if (appointment === state.appointments[key].id) {
        appointmentsListDetails.push(state.appointments[key]);
      }
    }
  });
  return appointmentsListDetails;
};