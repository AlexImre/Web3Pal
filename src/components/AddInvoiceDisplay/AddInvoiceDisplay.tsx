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
import { AddInvoiceType } from '../../context/stateContext';
import { addDummyData } from './DummyData';

export default function AddInvoiceDisplay() {
  const { data: session } = useSession();
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const {
    uuid,
    invoiceInformation,
    personalInformation,
    recipientInformation,
    paymentInformation,
    servicesInformation,
    notesInformation,
  } = masterState;
  const [showModal, setShowModal] = useState(false);

  const invoiceToast = () => toast.success('Invoice saved.');
  const email = session?.user?.email;
  const saveInvoice = async () => {
    // TODO add validation, all req fields must be filled
    console.log('saving invoice with id:', uuid);
    const invoiceToSave: AddInvoiceType = {
      invoiceId: uuid,
      user: email,
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
    addedInvoice.ok && invoiceToast();
  };

  return (
    <>
      <div className="m-10 flex max-w-2xl flex-col justify-center">
        <div className="-mt-5 flex items-baseline justify-between">
          <div className="text-2xl font-semibold text-slate-900">
            Invoice template
          </div>
          <div>
            <button
              onClick={() => {
                addDummyData();
              }}
              className="mb-4 mr-4 w-20 rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700"
            >
              +Test
            </button>
            <button
              onClick={() => {
                setMasterState({
                  ...initialState,
                  uuid: uuidv4(),
                  timestamp: Date.now(),
                });
              }}
              className="mb-4 mr-4 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
            >
              New
            </button>
            <button
              className="mb-4 mr-4 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            {showModal && <InvoiceModal setShowModal={setShowModal} />}
            <button className="mb-4 w-20 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700">
              Export
            </button>
          </div>
        </div>
        {/* {uuid} */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <PersonalInformationSection
              personalInformation={personalInformation}
              invoiceInformation={invoiceInformation}
            />

            <RecipientInformationSection
              recipientInformation={recipientInformation}
            />

            <PaymentDetailsSection paymentInformation={paymentInformation} />

            <div className="ml-3">
              <ServicesDisplaySection serviceData={servicesInformation} />
            </div>

            <NotesSection notesInformation={notesInformation} />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="my-4 w-20 rounded bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700"
            onClick={() => saveInvoice()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
