import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import TextArea from './Fields/TextArea';

export default function NotesForm() {
  const { masterState, setMasterState } = useContext(StateContext);
  const { notes } = masterState.invoice.notesInformation;

  const handleChange = (e) => {
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        notesInformation: {
          ...masterState.invoice.notesInformation,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  return (
    <>
      <TextArea
        name="notes"
        value={notes}
        handleChange={(e) => handleChange(e)}
      />
    </>
  );
}
