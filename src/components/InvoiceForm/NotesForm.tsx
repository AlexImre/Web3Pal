import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import TextArea from './Fields/TextArea';

export default function NotesForm() {
  const notesToast = () => toast.success('Information updated.');
  const { masterState, setMasterState } = useContext(StateContext);
  const [tempNotesInfo, setTempNotesInfo] = useState(
    masterState.invoice.notesInformation
  );
  const { notes } = tempNotesInfo;
  const handleChange = (e) => {
    setTempNotesInfo({
      ...tempNotesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        notesInformation: {
          ...tempNotesInfo,
        },
      },
    });
    notesToast();
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Notes
                  </h3>
                  <p className="mt-1 mb-5 text-sm text-gray-500">
                    Enter any additional information.
                  </p>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <TextArea
                        name="notes"
                        value={notes}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
