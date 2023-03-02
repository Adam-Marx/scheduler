import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  function deleteAppointment() {
    transition(CONFIRM);
  }

  function editAppointment(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(EDIT);

    props
      .updateInterview(props.id, interview)
      .then(() => transition(SHOW));
  }


  function handleEditAppointment(name, interviewer) {
    editAppointment(name, interviewer);
  }

  function onConfirmDelete() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => {
        transition(ERROR_DELETE, true);
      });
  }



  return (
    <article className="appointment" data-testid="appointment">

      <Header
        time={props.time}
      />

      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )
      }

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back} onSave={save}
        />
      )
      }

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )
      }

      {props.interview && mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteAppointment(props.id)}
          onEdit={() => handleEditAppointment(props.interview.student, props.interview.interviewer)}
        />
      )
      }

      {mode === SAVING && <Status message={'SAVING...'} />}

      {mode === DELETING && (
        <Status
          message={'DELETING...'}
        />
      )
      }

      {mode === CONFIRM && (
        <Confirm
          onCancel={() => back()}
          message={'Are you sure you want to delete this appointment?'}
          onConfirm={onConfirmDelete}
        />
      )
      }

      {mode === ERROR_SAVE && (
        <Error
          message={'There was an error while trying to save your appointment.'}
          onClose={back}
        />
      )
      }

      {mode === ERROR_DELETE && (
        <Error
          message={'There was an error while trying to delete your appointment.'}
          onClose={back}
        />
      )
      }

    </article>
  );
};