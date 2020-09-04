import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode"
import Form from "./Form.js"

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  return (    
  <article className="appointment">
  <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={() => {return transition(CREATE)}} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
  {mode === CREATE && (
 <Form interviewers={props.interviewers} onSave={"save"} onCancel={() => {return back(EMPTY)}}/>
  )}
  </article>);

};