import { forwardRef, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PencilIcon } from '@heroicons/react/24/solid';
import { StateContext } from '@/context/stateContext';
import subDays from 'date-fns/subDays';

const DatePickerReact = (props: any) => {
  const { isIssueDate } = props;
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { issueDate, dueDate } = masterState.invoice.invoiceInformation;
  const propertyToUpdate = isIssueDate ? 'issueDate' : 'dueDate';
  const valueToUse = isIssueDate ? issueDate : dueDate;

  const updateDate = (date: any) => {
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        invoiceInformation: {
          ...masterState.invoice.invoiceInformation,
          [propertyToUpdate]: date,
        },
      },
    });
  };

  // eslint-disable-next-line react/display-name
  const ExampleCustomInput = forwardRef(
    ({ issueDate: value, onClick }: any, ref: any) => (
      <button
        className="example-custom-input flex items-center justify-end"
        onClick={onClick}
        ref={ref}
        value={value}
      >
        <div className="ml-3 w-fit cursor-pointer rounded-full p-0.5 text-indigo-600 hover:bg-indigo-100">
          <PencilIcon width="16" height="16" />
        </div>
      </button>
    )
  );

  return (
    <div className="relative">
      <DatePicker
        selected={new Date(valueToUse)}
        onChange={(date: Date) => updateDate(date)}
        customInput={<ExampleCustomInput />}
        excludeDateIntervals={
          isIssueDate
            ? ''
            : [
                {
                  start: subDays(new Date(issueDate), 40000),
                  end: subDays(new Date(issueDate), 1),
                },
              ]
        }
      />
    </div>
  );
};

DatePickerReact.displayName = 'DatePickerReact';
export default DatePickerReact;
