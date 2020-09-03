import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import interviewer from "../InterviewerList";
import setInterviewer from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setError("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };


  const save = () => {
    if (!name) {
      return setError("Please fill in the student's name");
    }
    if (!interviewer) {
      return setError("Please select an interviewer");
    }
    setError("");
    props.onSave(name, interviewer);
    };
  


  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        <section className="appointment__validation">{error}</section>
        </form >
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}
