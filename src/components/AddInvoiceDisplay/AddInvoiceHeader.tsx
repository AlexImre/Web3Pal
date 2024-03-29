import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import 'react-tooltip/dist/react-tooltip.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  InvoiceType,
  StateContext,
  TempServicesInfoContext,
  initialState,
} from '@/context/stateContext';
import toast from 'react-hot-toast';
import {
  hasDueDateError,
  hasInvoiceNumberError,
} from '../InvoiceForm/Fields/formValidation';
import { getAddInvoiceHeaderStatusChip } from '../MyInvoices/myInvoicesUtils';
import { initialTempServicesInfo } from '@/context/stateContext';
import { v4 as uuidv4 } from 'uuid';
import { fetchInvoiceNumber } from '@/utils/fetchData';

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

  const [invoiceSavedTrigger, setInvoiceSavedTrigger] = useState(0);
  const [invoicePublishedTrigger, setInvoicePublishedTrigger] = useState(0);
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
    isDraft,
  } = masterState.invoice;
  const router = useRouter();

  useEffect(() => {
    if (invoiceSavedTrigger > 0) {
      setMasterState({
        ...masterState,
        invoice: {
          ...invoice,
          status: 'Draft',
        },
      });
    }
  }, [invoiceSavedTrigger]);

  useEffect(() => {
    if (invoicePublishedTrigger > 0) {
      setMasterState({
        ...masterState,
        invoice: {
          ...invoice,
          status: 'Unpaid',
        },
      });
    }
  }, [invoiceSavedTrigger]);

  const saveInvoiceChecks = async (invoice, isAttemptingPublish, isLoading) => {
    const invoiceNumberCheck = await hasInvoiceNumberError(
      invoice.invoiceInformation.invoiceNumber,
      email,
      invoice.invoiceId
    );
    const dueDateCheck = hasDueDateError(
      invoice.invoiceInformation.issueDate,
      invoice.invoiceInformation.dueDate
    );
    const isClientNameMissing =
      invoice.recipientInformation.clientName === '' ||
      invoice.recipientInformation.clientName === undefined;
    const isWalletAddressMissing =
      invoice.paymentInformation.walletAddress === '' ||
      invoice.paymentInformation.walletAddress === undefined;

    setMasterState((prevState) => {
      return {
        ...prevState,
        validation: {
          ...prevState.validation,
          invoiceNumber: !!invoiceNumberCheck
            ? isLoading
              ? 'loading'
              : 'fail'
            : 'pass',
          dueDate: !!dueDateCheck ? (isLoading ? 'loading' : 'fail') : 'pass',
          recipientInformation: isClientNameMissing
            ? isLoading
              ? 'loading'
              : 'fail'
            : 'pass',
          wallet: isWalletAddressMissing
            ? isLoading
              ? 'loading'
              : 'fail'
            : 'pass',
        },
      };
    });

    // do want to save at this stage, its on send that we want this to fail
    if (isAttemptingPublish) {
      const failedToast = () =>
        toast.error('Complete all required information.');
      const hasValidationError =
        !!invoiceNumberCheck ||
        !!dueDateCheck ||
        isClientNameMissing ||
        isWalletAddressMissing;

      if (hasValidationError) {
        failedToast();
        return false;
      }
    }
  };

  const createNewInvoice = async () => {
    console.log(
      'autoGeneratedInvoiceNumber:',
      masterState.autoGeneratedInvoiceNumber
    );

    const invoiceNumber = await fetchInvoiceNumber(organisationId);

    console.log('invoiceNumber:', invoiceNumber);

    setMasterState({
      ...initialState,
      organisation: masterState.organisation,
      marketData: masterState.marketData,
      invoice: {
        ...initialState.invoice,
        invoiceId: uuidv4(),
        createdTimestamp: new Date(Date.now()),
        organisationId,
        personalInformation: {
          ...initialState.invoice.personalInformation,
          name: organisation.organisationName,
          email: organisation.organisationEmail,
        },
        invoiceInformation: {
          ...initialState.invoice.invoiceInformation,
          invoiceNumber,
        },
      },
    });

    setTempServicesInfo(initialTempServicesInfo);

    router.push({ pathname: '/addinvoice' }, undefined, { shallow: true });
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    const savedToast = () => toast.success('Invoice saved.');
    await saveInvoiceChecks(invoice, false, false);
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
      setInvoiceSavedTrigger(invoiceSavedTrigger + 1);
      savedToast();
    } else {
      toast.error('Something went wrong, invoice not saved.');
    }
  };

  const [isSendButtonActive, setIsSendButtonActive] = useState(false);
  const publishValidation = () => {
    for (const check in validation) {
      if (validation[check] !== 'pass') {
        setIsSendButtonActive(false);
        return;
      } else {
        setIsSendButtonActive(true);
      }
    }
  };

  useEffect(() => {
    // do checks and set "send" button to inactive
    saveInvoiceChecks(invoice, false, true);
  }, []);

  useEffect(() => {
    publishValidation();
  }, [validation]);

  const publishInvoice = async () => {
    if (!isSendButtonActive) {
      toast.error('Please complete all required sections.');
      return;
    }

    const publishedToast = () => toast.success('Invoice published.');
    // TODO add validation, all req fields must be filled
    console.log('publishing invoice with id:', invoiceId);
    const publishedInvoice = await fetch('/api/publishinvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceId),
    });

    if (publishedInvoice.ok) {
      setInvoiceSavedTrigger(invoiceSavedTrigger + 1);
      publishedToast();
      router.push('/dashboard');
    } else {
      toast.error('Something went wrong, invoice not saved.');
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

      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          {getAddInvoiceHeaderStatusChip(invoice)}
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="hidden w-28 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-slate-900 sm:block"
              onClick={createNewInvoice}
            >
              Create new
            </button>
            <button
              type="button"
              className="hidden w-28 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-slate-900 sm:block"
              onClick={(e) => saveInvoice(e)}
            >
              Save draft
            </button>
            <button
              type="button"
              className={classNames(
                isSendButtonActive
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-400',
                'w-28  rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              )}
              disabled={!isSendButtonActive}
              onClick={publishInvoice}
            >
              Send
            </button>

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
