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
      name: 'Number & dates',
      status: formCompletion.invoiceInformation,
    },
    {
      name: 'Your details',
      status: formCompletion.personalInformation,
    },
    {
      name: 'Billed to',
      status: formCompletion.recipientInformation,
    },
    {
      name: 'Payment details',
      status: formCompletion.paymentInformation,
    },
    {
      name: 'Services info',
      status: formCompletion.servicesInformation,
    },
  ];

  return (
    <div className="hidden w-72 rounded-lg bg-white p-8 shadow-sm ring-1 ring-gray-900/5 xl:block ">
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
                    className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-green-400"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="group relative flex items-center">
                  <span className="flex h-9 items-center">
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-green-400">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="font-small text-sm">{step.name}</span>
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
                    <span className="font-small text-sm text-gray-500">
                      {step.name}
                    </span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
      <div className="flex justify-between space-x-3 pt-8">
        <button
          type="button"
          className="hidden w-full rounded-md bg-slate-600 p-3 text-sm font-semibold leading-6 text-white sm:block"
        >
          Save draft
        </button>
        <button
          type="button"
          className="hidden w-full rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white sm:block"
        >
          Send
        </button>
      </div>
    </div>
  );
}
