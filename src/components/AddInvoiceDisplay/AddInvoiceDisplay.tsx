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

export default function AddInvoiceDisplay() {
  const router = useRouter();
  const { data: session } = useSession();
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoice } = masterState;
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
  } = masterState.invoice;
  const [showModal, setShowModal] = useState(false);

  const email = session?.user?.email;
  const saveInvoice = async () => {
    const savedToast = () => toast.success('Invoice saved.');
    // TODO add validation, all req fields must be filled
    console.log('saving invoice with id:', invoiceId);
    const invoiceToSave: InvoiceType = {
      invoiceId,
      user: email,
      status: 'Draft',
      txHash: '',
      createdTimestamp: new Date(Date.now()),
      paidTimestamp: undefined,
      invoiceInformation,
      personalInformation,
      recipientInformation,
      paymentInformation,
      servicesInformation,
      notesInformation,
    };
    const addedInvoice = await fetch('/api/saveinvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceToSave),
    });
    addedInvoice.ok && savedToast();
  };

  const publishInvoice = async () => {
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
      publishedToast();
    }
  };

  const createNewInvoice = () => {
    setMasterState({
      ...initialState,
      invoice: {
        ...initialState.invoice,
        invoiceId: uuidv4(),
        createdTimestamp: new Date(Date.now()),
        status: 'Example',
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
      <div className="m-10 flex max-w-2xl flex-col justify-center">
        <div className="-mt-5 mb-2 flex items-center justify-between">
          <div>
            <button
              onClick={() => {
                addDummyData();
              }}
              className="my-2 mr-2 w-20 rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
            >
              +Test
            </button>
            <button
              onClick={createNewInvoice}
              className="m-2 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
            >
              New
            </button>
            {isInvoiceDraft && (
              <button
                className="my-2 ml-2 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                onClick={() => setShowModal(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div>
            {showModal && <InvoiceModal setShowModal={setShowModal} />}
            {/* <button className="mb-4 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
              Export
            </button> */}
            {
              <button className="my-2 ml-2 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
                Send
              </button>
            }
          </div>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <InvoiceStatusHeader invoiceStatus={invoiceStatus} txHash={txHash} />

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

            <NotesSection notesInformation={notesInformation} />
          </div>
        </div>
        <div className="flex justify-end">
          {isInvoiceDraft && (
            <button
              className="my-4 mr-4 w-1/2 rounded bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700"
              onClick={() => saveInvoice()}
            >
              Save progress
            </button>
          )}
          {isInvoiceDraft && (
            <button
              className="my-4 w-1/2 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={() => publishInvoice()}
            >
              Publish invoice
            </button>
          )}
        </div>
      </div>
    </>
  );
}
