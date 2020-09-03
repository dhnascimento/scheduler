import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import "components/Appointment";
import Appointment from "components/Appointment";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Hermeto Pascoal",
      interviewer: {
        id: 7,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg"
      }
    }
  },
  {
    id: 8,
    time: "3pm",
    interview: {
      student: "Tracer Ho",
      interviewer: {
        id: 8,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg"
      }
    }
  },
  {
    id: 9,
    time: "6pm",
    interview: {
      student: "Krl Alado",
      interviewer: {
        id: 8,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  }
];

export default function Application(props) {

  // const setDayName = day => setState(prev => ({ ...prev, day}));
  
  const [state, setState] =   useState({
    dayName: "Monday",
    days: [],
    appointments: []
  });
  
  const setDay = dayName => setState(prev => ({ ...prev, dayName }));
  
  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
    .then(response => {
      console.log("RESPONSE", response.data);
      setState(prev => ({...prev, days: response.data}));
         })
  }, []);

  return (
      <main className="layout">
        <section className="sidebar">
          <img
    className="sidebar--centered"
    src="images/logo.png"
    alt="Interview Scheduler"
  />
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu">
    <DayList
      days={state.days}
      day={state.dayName}
      setDay={setDay}
    />
  </nav>
  <img
    className="sidebar__lhl sidebar--centered"
    src="images/lhl.png"
    alt="Lighthouse Labs"
  />
        </section>
        <section className="schedule">
          {appointments.map(appointment =>{
            return <Appointment key={appointment.id} {...appointment} />
          })}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    );
  }
