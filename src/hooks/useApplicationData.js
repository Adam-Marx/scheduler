import axios from "axios";
import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  // RESET DATABASE: /api/debug/reset

  function bookInterview(id, interview) {
    return axios
    .put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state, 
        appointments
      })
    })
    .then(() => {
      setState(prevState => ({
        ...prevState,
        days: prevState.days.map(day => {
          if (day.name === state.day) {
            return {
              ...day,
              spots: day.spots - 1
            };
          }
          return day;
        })
      }))
    })
  };

  function cancelInterview(id) {
    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {
      const appointment = {
        ...state.appointments[id],
        interview : null
      }

      const appointments = {
        ...state.appointments,
        [id]: appointment
      }

      setState({
        ...state,
        appointments
      })
    })
    .then(() => {
      setState(prevState => ({
        ...prevState,
        days: prevState.days.map(day => {
          if (day.name === state.day) {
            return {
              ...day,
              spots: day.spots + 1
            };
          }
          return day;
        })
      }));
    })
  }

  function updateInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        setState(prevState => ({ ...prevState, appointments }));
      });
  }



  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);


  return { state, setDay, bookInterview, cancelInterview, updateInterview };
}