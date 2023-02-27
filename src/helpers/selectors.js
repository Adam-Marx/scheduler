export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(specificDay => specificDay.name === day);

  if (!selectedDay) {
    return [];
  }

  const appointmentIds = selectedDay.appointments;
  const appointments = [];

  for (let i = 0; i < appointmentIds.length; i++) {
    const appointment = state.appointments[appointmentIds[i]];
    if (appointment) {
      appointments.push(appointment);
    }
  }

  return appointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer]
    if(!interviewer) {
      return null;
    }

  const formattedInterview = {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar
    }
  }

  return formattedInterview;

}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(specificDay => specificDay.name === day);

  if (!selectedDay) {
    return [];
  }

  const interviewerIds = selectedDay.interviewers;
  const interviewers = [];

  for (let i = 0; i < interviewerIds.length; i++) {
    const interviewer = state.interviewers[interviewerIds[i]];
    if (interviewer) {
      interviewers.push(interviewer);
    }
  }

  return interviewers;
}
