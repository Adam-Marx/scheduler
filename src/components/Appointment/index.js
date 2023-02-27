import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"
import Form from "components/Appointment/Form.js"
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  // const FORM = "FORM";
  // const DELETING = "DELETING";
  // const CONFIRM = "CONFIRM";
  // const EDIT = "EDIT";
  // const ERROR_SAVE = "ERROR_SAVE";
  // const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
        <Header
          time={props.time}
          />
         {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
         {mode === CREATE && <Form interviewers={[]} onCancel={back}/>}
         {mode === SHOW && (
            <Show
              student={props.interview.student}
              interviewer={props.interview.interviewer}
            />
        )}
    </article>
  )
};