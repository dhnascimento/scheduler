import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";

import "components/Appointment";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] =   useState({
    dayName: "Monday",
    days: [],
    appointments: []
  });
  
  const setDay = dayName => setState(prev => ({ ...prev, dayName }));
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(`/api/days`)),
      Promise.resolve(axios.get(`/api/appointments`))
    ])    
    .then((all) => {
      setState(prev => ({days: all[0].data, appointments: all[1].data}));
      })
    }, []);

    const appointments = getAppointmentsForDay(state, state.dayName);
   
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
