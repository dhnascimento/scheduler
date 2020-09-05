import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment(props) {

function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => console.log(error));
  }

  function cancel(bool) {
    if(!bool) {
      transition(CONFIRMING)
    }
    if(bool) {
      transition(DELETING)
  
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => console.log(error));
    }
  }

  const EDITING = "EDITING";
  const MESSAGE = "Delete the appointment?"
  const CONFIRMING = "CONFIRMING";
  const DELETING = "DELETING";
  const SAVING = "SAVING"
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
    onDelete={() => cancel(false)}
    onEdit={() => transition(EDITING)}
  />
)}
  {mode === CREATE && (
 <Form interviewers={props.interviewers} onSave={save} onCancel={() => {return back(EMPTY)}}/>
  )}
  {mode === SAVING &&( <Status message={SAVING} />)}
  {mode === DELETING && (<Status message={DELETING} />)}
  {mode === CONFIRMING && (<Confirm message={MESSAGE} onCancel={back} onConfirm={() => cancel(true)} />)}
  {mode === EDITING && (< Form name={props.interview.student} interviewer={props.interview.interviewer.id} 
   interviewers={props.interviewers} 
  onSave={save} onCancel={() => {return back(SHOW)}}/>)}
  </article>);

};