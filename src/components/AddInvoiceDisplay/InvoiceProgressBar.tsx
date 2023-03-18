import { CheckIcon } from '@heroicons/react/20/solid';
import { StateContext } from '../../context/stateContext';
import { useContext } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function InvoiceProgressBar() {
  const { masterState, setMasterState } = useContext(StateContext);
  const { invoice } = masterState;
  const { formCompletion } = invoice;

  const steps = [
    {
      name: 'Personal information',
      status: formCompletion.personalInformation,
    },
    {
      name: 'Invoice information',
      status: formCompletion.invoiceInformation,
    },
    {
      name: 'Recipient information',
      status: formCompletion.recipientInformation,
    },
    {
      name: 'Payment details',
      status: formCompletion.paymentInformation,
    },
    {
      name: 'Services',
      status: formCompletion.servicesInformation,
    },
    {
      name: 'Notes',
      status: formCompletion.notesInformation,
    },
    {
      name: 'Publish',
      status: 'upcoming',
    },
    {
      name: 'Send',
      status: 'upcoming',
    },
  ];

  return (
    <ol role="list" className="overflow-hidden">
      {steps.map((step, stepIdx) => (
        <li
          key={step.name}
          className={classNames(
            stepIdx !== steps.length - 1 ? 'pb-10' : '',
            'relative'
          )}
        >
          {step.status === true ? (
            <>
              {stepIdx !== steps.length - 1 ? (
                <div
                  className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                  aria-hidden="true"
                />
              ) : null}
              <div className="group relative flex items-center">
                <span className="flex h-9 items-center">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <span className="ml-4 flex min-w-0 flex-col">
                  <span className="text-sm font-medium">{step.name}</span>
                </span>
              </div>
            </>
          ) : (
            <>
              {stepIdx !== steps.length - 1 ? (
                <div
                  className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                  aria-hidden="true"
                />
              ) : null}
              <div className="group relative flex items-center">
                <span className="flex h-9 items-center" aria-hidden="true">
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                    <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                  </span>
                </span>
                <span className="ml-4 mr-4 flex min-w-0 flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    {step.name}
                  </span>
                </span>
              </div>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}
