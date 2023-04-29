import { Fragment, useContext, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import 'react-tooltip/dist/react-tooltip.css';
import { useSession } from 'next-auth/react';
import {
  InvoiceType,
  StateContext,
  TempServicesInfoContext,
} from '@/context/stateContext';
import toast from 'react-hot-toast';
import {
  hasDueDateError,
  hasInvoiceNumberError,
} from '../InvoiceForm/Fields/formValidation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function AddInvoiceHeader() {
  const { data: session } = useSession();
  const email = session?.user.email;
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const tempServicesContext = useContext(TempServicesInfoContext);
  const { tempServicesInfo, setTempServicesInfo } = tempServicesContext;
  const { invoice, organisation, validation } = masterState;
  const organisationId = organisation._id;
  const {
    invoiceId,
    status,
    txHash,
    invoiceInformation,
    personalInformation,
    recipientInformation,
    paymentInformation,
    notesInformation,
    formCompletion,
  } = masterState.invoice;

  const saveInvoiceChecks = async (invoice) => {
    setMasterState((prevState) => {
      return {
        ...prevState,
        validation: {
          ...prevState.validation,
          invoiceNumber: false,
          dueDate: false,
          recipientInformation: false,
          wallet: false,
        },
      };
    });

    const invoiceNumberCheck = await hasInvoiceNumberError(
      invoice.invoiceInformation.invoiceNumber,
      email,
      invoice.invoiceInformation.invoiceId
    );

    if (!!invoiceNumberCheck) {
      setMasterState((prevState) => {
        return {
          ...prevState,
          validation: {
            ...prevState.validation,
            invoiceNumber: true,
          },
        };
      });
    }

    const dueDateCheck = hasDueDateError(
      invoice.invoiceInformation.issueDate,
      invoice.invoiceInformation.dueDate
    );

    if (!!dueDateCheck) {
      setMasterState((prevState) => {
        return {
          ...prevState,
          validation: {
            ...prevState.validation,
            dueDate: true,
          },
        };
      });
    }

    const isClientNameMissing =
      invoice.recipientInformation.clientName === '' ||
      invoice.recipientInformation.clientName === undefined;

    if (isClientNameMissing) {
      setMasterState((prevState) => {
        return {
          ...prevState,
          validation: {
            ...prevState.validation,
            recipientInformation: true,
          },
        };
      });
    }

    const isWalletAddressMissing =
      invoice.paymentInformation.walletAddress === '' ||
      invoice.paymentInformation.walletAddress === undefined;

    if (isWalletAddressMissing) {
      setMasterState((prevState) => {
        return {
          ...prevState,
          validation: {
            ...prevState.validation,
            wallet: true,
          },
        };
      });
    }

    const hasValidationError =
      !!invoiceNumberCheck ||
      !!dueDateCheck ||
      isClientNameMissing ||
      isWalletAddressMissing;

    if (hasValidationError) {
      return false;
    }
  };

  const saveInvoice = async () => {
    const savedToast = () => toast.success('Invoice saved.');

    const doesInvoicePassValidation = await saveInvoiceChecks(invoice);
    if (!doesInvoicePassValidation) {
      return;
    }

    // TODO add validation, all req fields must be filled
    console.log('saving invoice with id:', invoiceId);
    const invoiceToSave: InvoiceType = {
      invoiceId,
      organisationId,
      user: email,
      status: 'Draft',
      isDraft: true,
      txHash: '',
      createdTimestamp: new Date(Date.now()),
      paidTimestamp: undefined,
      invoiceInformation,
      personalInformation,
      recipientInformation,
      paymentInformation,
      servicesInformation: tempServicesInfo,
      notesInformation,
      formCompletion,
    };

    console.log('invoiceToSave:', invoiceToSave);
    const addedInvoice = await fetch('/api/saveinvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceToSave),
    });

    if (addedInvoice.ok) {
      setMasterState({
        ...masterState,
        invoice: {
          ...invoice,
          status: 'Draft',
        },
      });
      savedToast();
    }
  };

  return (
    <header className="relative isolate">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
          <div
            className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#4F46E5] to-[#4F46E5]"
            style={{
              clipPath:
                'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
            }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            <h1>
              <div className="text-xl font-semibold leading-6 text-indigo-500">
                DRAFT
              </div>
            </h1>
          </div>
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <button
              type="button"
              className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
              onClick={saveInvoice}
            >
              Save draft
            </button>
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </a>

            <Menu as="div" className="relative sm:hidden">
              <Menu.Button className="-m-3 block p-3">
                <span className="sr-only">More</span>
                <EllipsisVerticalIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                        )}
                      >
                        Copy URL
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AddInvoiceHeader;
