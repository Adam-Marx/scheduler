import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  // RESET DATABASE: /api/debug/reset

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: { ...interview }
          }
        };
        setState(prev => ({ ...prev, appointments }));
        updateSpots(state, appointments);
      });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: null
          }
        };
        setState(prev => ({ ...prev, appointments }));
        updateSpots(state, appointments);
      });
  };

  const updateInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: {
            ...state.appointments[id],
            interview: { ...interview }
          }
        };
        setState(prev => ({ ...prev, appointments }));
        updateSpots(state, appointments);
      });
  };

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const updateSpots = (state, appointments) => {
    const newDays = state.days.map(day => {
      const dayAppointments = day.appointments;
      let spots = 0;
      for (const id of dayAppointments) {
        if (!appointments[id].interview) {
          spots++;
        }
      }
      const newDay = { ...day, spots };
      return newDay;
    });
    setState(prev => ({ ...prev, days: newDays }));
  };


  return { state, setDay, bookInterview, cancelInterview, updateInterview };
}
