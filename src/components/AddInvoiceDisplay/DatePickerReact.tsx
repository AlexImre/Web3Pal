import { forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PencilIcon } from '@heroicons/react/24/solid';
import { StateContext } from '@/context/stateContext';

// eslint-disable-next-line react/display-name
function DatePickerReact() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { issueDate } = masterState.invoice.invoiceInformation;

  const updateDate = (date: any) => {
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        invoiceInformation: {
          ...masterState.invoice.invoiceInformation,
          issueDate: date,
        },
      },
    });
  };

  const ExampleCustomInput = forwardRef(
    ({ issueDate, onClick }: any, ref: any) => (
      <button
        className="example-custom-input flex items-center justify-end"
        onClick={onClick}
        ref={ref}
        value={issueDate}
      >
        <PencilIcon
          className="ml-3 h-4 w-4 text-indigo-600"
          aria-hidden="true"
        />
      </button>
    )
  );
  return (
    <div className="relative">
      <DatePicker
        selected={issueDate}
        onChange={(date: Date) => updateDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}

DatePickerReact.displayName = 'DatePickerReact';
export default DatePickerReact;
