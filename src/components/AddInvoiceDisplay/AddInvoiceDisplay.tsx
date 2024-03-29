import React from 'react';
import ServicesDisplaySection from './ServicesDisplaySection';
import InvoiceModal from '../InvoiceModal';
import { StateContext, initialState } from '../../context/stateContext';
import { useContext, useState } from 'react';
import PersonalInformationSection from './PersonalInformationSection';
import RecipientInformationSection from './RecipientInformationSection';
import PaymentDetailsSection from './PaymentDetailsSection';
import NotesSection from './NotesSection';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceType } from '../../context/stateContext';
import { addDummyData } from './DummyData';
import { useRouter } from 'next/router';
import { getInvoiceStatus } from './GetInvoiceStatus';
import InvoiceStatusHeader from './InvoiceStatusHeader';
import InvoiceProgressBar from './InvoiceProgressBar';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { fetchInvoiceNumber } from '@/utils/fetchData';

export default function AddInvoiceDisplay() {
  const router = useRouter();
  const { data: session } = useSession();
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoice, organisation } = masterState;
  const {
    invoiceId,
    status,
    txHash,
    invoiceInformation,
    personalInformation,
    recipientInformation,
    paymentInformation,
    servicesInformation,
    notesInformation,
    formCompletion,
  } = masterState.invoice;
  const organisationId = organisation._id;
  const [showModal, setShowModal] = useState(false);

  const email = session?.user?.email;

  const emailInvoice = async (invoice) => {
    console.log('made it to emailInvoice()');
    const emailedInvoice = await fetch('/api/send-mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoice: invoice,
      }),
    });
  };

  const publishInvoice = async () => {
    for (const form in formCompletion) {
      if (formCompletion[form] === false) {
        toast.error('Please complete all required sections.');
        return;
      }
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
      setMasterState({
        ...masterState,
        invoice: {
          ...invoice,
          status: 'Unpaid',
        },
      });
      emailInvoice(invoice.recipientInformation.clientEmail);
      publishedToast();
    }
  };

  const createNewInvoice = async () => {
    const invoiceNumber = await fetchInvoiceNumber(organisationId);
    const convertDateStringToInputFormat = (date: string) => {
      const dateArray = date.split('/');
      const year = dateArray[2];
      const month = dateArray[1];
      const day = dateArray[0];
      return `${year}-${month}-${day}`;
    };

    setMasterState({
      ...initialState,
      organisation: masterState.organisation,
      marketData: masterState.marketData,
      invoice: {
        ...initialState.invoice,
        invoiceId: uuidv4(),
        organisationId,
        createdTimestamp: new Date(Date.now()),
        status: 'Example',
        invoiceInformation: {
          ...initialState.invoice.invoiceInformation,
          invoiceNumber,
        },
      },
    });

    router.push({ pathname: '/addinvoice' }, undefined, { shallow: true });
  };

  const invoiceStatus = getInvoiceStatus(invoice);
  const isInvoiceDraft =
    invoiceStatus === 'Draft' || invoiceStatus === 'Example';

  const isInvoiceUnpaid =
    invoiceStatus === 'Unpaid' || invoiceStatus === 'Overdue';

  return (
    <>
      <div className="flex items-center">
        <div className="mx-10 my-4 flex w-[600px] max-w-2xl flex-col justify-center">
          <div className="flex items-center justify-between">
            <div>
              {/* <button
                onClick={() => {
                  addDummyData(organisationId);
                }}
                className="mr-4 w-24 rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
              >
                +Test
              </button> */}
              <button
                onClick={createNewInvoice}
                className="mr-2 w-24 rounded border border-zinc-300 bg-white py-2 px-4 text-sm text-gray-800 shadow hover:bg-gray-100"
              >
                New
              </button>
              {isInvoiceDraft && (
                <button
                  className="ml-2 w-24 rounded border border-zinc-300 bg-white py-2 px-4 text-sm text-gray-800 shadow hover:bg-gray-100"
                  onClick={() => setShowModal(true)}
                >
                  Edit
                </button>
              )}
            </div>
            <div>
              {showModal && <InvoiceModal setShowModal={setShowModal} />}
            </div>
          </div>
          <div className="mb-4">
            <InvoiceStatusHeader
              invoiceStatus={invoiceStatus}
              txHash={txHash}
            />
          </div>
          <div className="border border-zinc-300 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <PersonalInformationSection
                personalInformation={personalInformation}
                invoiceInformation={invoiceInformation}
                status={status}
              />

              <RecipientInformationSection
                recipientInformation={recipientInformation}
              />

              <PaymentDetailsSection paymentInformation={paymentInformation} />

              <div className="ml-3">
                <ServicesDisplaySection
                  serviceData={servicesInformation}
                  invoiceLabelling={paymentInformation.invoiceLabelling}
                />
              </div>

              {notesInformation.notes && (
                <NotesSection notesInformation={notesInformation} />
              )}
            </div>
          </div>
          <div className="flex">
            {isInvoiceDraft && (
              <div className="mr-2 w-full">
                <button className="my-4 w-full rounded border border-zinc-300 bg-white py-2 px-4 text-sm text-gray-800 shadow hover:bg-gray-100">
                  Save progress
                </button>
              </div>
            )}
            {isInvoiceDraft && (
              <div className="ml-2 w-full justify-center">
                <button
                  className="my-4 flex w-full items-center justify-center rounded border border-indigo-600 bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700"
                  onClick={publishInvoice}
                >
                  <PaperAirplaneIcon className="curs mr-2 h-5 w-5 text-white hover:cursor-pointer" />
                  Publish and send invoice
                </button>
              </div>
            )}
            {isInvoiceDraft && (
              <div className="ml-2 w-full justify-center">
                <button
                  className="my-4 flex w-full items-center justify-center rounded border border-indigo-600 bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700"
                  onClick={() => emailInvoice(invoice)}
                >
                  <PaperAirplaneIcon className="curs mr-2 h-5 w-5 text-white hover:cursor-pointer" />
                  Email Test
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:flex">
          {isInvoiceDraft && <InvoiceProgressBar />}
        </div>
      </div>
    </>
  );
}
