import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form.js";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {

function save(name, interviewer) {
  
  const interview = {
    student: name,
    interviewer
  };
    
  transition(SAVING);


  props.bookInterview(props.id, interview)
  .then(() => transition(SHOW))
  .catch((error) => {transition(ERROR_SAVE, true);
    console.log(error)});
  }

  function cancel(bool) {
    if(!bool) {
      transition(CONFIRMING)
    }
    if(bool) {
      transition(DELETING, true)
  
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
    } 
  }

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
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
 <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>
  )}
  {mode === SAVING &&( <Status message={SAVING} />)}
  {mode === DELETING && (<Status message={DELETING} />)}
  {mode === CONFIRMING && (<Confirm message={MESSAGE} onCancel={back} onConfirm={() => cancel(true)} />)}
  {mode === EDITING && (< Form name={props.interview.student} interviewer={props.interview.interviewer.id} 
   interviewers={props.interviewers} 
  onSave={save} onCancel={back}/>)}
  {mode === ERROR_SAVE && (<Error message="Could not save the appointment." onClose={back} />)}
  {mode === ERROR_DELETE && (<Error message="Could not delete the appointment." onClose={back} />)}
  </article>);

};