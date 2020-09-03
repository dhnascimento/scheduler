export function getAppointmentsForDay(array, day) {

  const filteredDays = array.days.filter(item => item.name === day)
  const appointmentsDay = [];
  if (!filteredDays[0]) {

      return appointmentsDay;

  } else {
      const appointID = filteredDays[0].appointments
      console.log("appointID",appointID )

      for (let id of appointID ) {
        appointmentsDay.push(array.appointments[id]);
      }
      return appointmentsDay
  };
};
