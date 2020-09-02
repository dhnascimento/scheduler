export function getAppointmentsForDay(state, day) {

  const filteredDays = state.days.filter(item => item.name === day)
  const appointmentsDay = [];

  if (!filteredDays[0]) {

      return appointmentsDay;

  } else {
      const appointID = filteredDays[0].appointments;
      
      for (let id of appointID ) {
        appointmentsDay.push(state.appointments[id]);
      }
      return appointmentsDay
  };
};
