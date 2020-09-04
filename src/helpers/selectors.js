export function getAppointmentsForDay(array, day) {
  const filteredDays = array.days.filter(item => item.name === day)
  const appointmentsDay = [];
  if (!filteredDays[0]) {

      return appointmentsDay;

  } else {
      const appointID = filteredDays[0].appointments

      for (let id of appointID ) {
        appointmentsDay.push(array.appointments[id]);
      }
      return appointmentsDay
  };
};

export function getInterview(state, interview) {
   if (!interview) {
      
      return null;

    } else {
      
      const intObj = {
        student:interview.student, 
        interviewer: interview.interviewer
      };
       
      intObj.interviewer = state.interviewers[intObj.interviewer]
 
      return intObj;
    }
  };

export function getInterviewersForDay(array, day) {
  const filteredDays = array.days.filter(item => item.name === day)
  const interviewersDay = [];
  if (!filteredDays[0]) {

      return interviewersDay;

  } else {
      const interviewersID = filteredDays[0].interviewers

      for (let id of interviewersID) {
        interviewersDay.push(array.interviewers[id]);
      }
      return interviewersDay
  };
};


