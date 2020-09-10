export function getAppointmentsForDay(array, day) {
  const filteredDays = array.days.filter((item) => item.name === day);
  const appointmentsDay = [];
  if (!filteredDays[0]) {
    return appointmentsDay;
  }
  const appointID = filteredDays[0].appointments;

  for (const id of appointID) {
    appointmentsDay.push(array.appointments[id]);
  }
  return appointmentsDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const intObj = {
    student: interview.student,
    interviewer: interview.interviewer,
  };

  intObj.interviewer = state.interviewers[intObj.interviewer];

  return intObj;
}

export function getInterviewersForDay(array, day) {
  const filteredDays = array.days.filter((item) => item.name === day);
  const interviewersDay = [];
  if (!filteredDays[0]) {
    return interviewersDay;
  }
  const interviewersID = filteredDays[0].interviewers;

  for (const id of interviewersID) {
    interviewersDay.push(array.interviewers[id]);
  }
  return interviewersDay;
}
