import NotesSection from '@/components/AddInvoiceDisplay/NotesSection';
import PaymentDetailsSection from '@/components/AddInvoiceDisplay/PaymentDetailsSection';
import PersonalInformationSection from '@/components/AddInvoiceDisplay/PersonalInformationSection';
import RecipientInformationSection from '@/components/AddInvoiceDisplay/RecipientInformationSection';
import ServicesDisplaySection from '@/components/AddInvoiceDisplay/ServicesDisplaySection';
import InvoicesHeader from '@/components/Invoices/InvoicesHeader';
import React from 'react';
import { usePrepareSendTransaction, useWaitForTransaction } from 'wagmi';
import { useSendTransaction } from 'wagmi';
import SuccessfulPaymentAlert from '@/components/Web3/SuccessfulPaymentAlert';
import { ethers } from 'ethers';
import { getServicesTotal } from '@/components/InvoiceForm/ServicesUtils';
import FailedPaymentAlert from '@/components/Web3/FailedPaymentAlert';

// Add types to serverside + invoice being passed in

export async function getServerSideProps(context) {
  const { invoiceid } = context.params;
  const invoiceData = await fetch(
    `http://localhost:3000/api/view/${invoiceid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const response = await invoiceData.json();

  return {
    props: { invoice: response },
  };
}

// NOTE - Need to update database with status of paid invoice, also think about prompting user to connect wallet first? maybe grey out pay invoice button until connected?
// Make sure it connects to the right chain

function Invoice(props) {
  const { invoice } = props;
  const invoiceData = invoice[0];
  const {
    personalInformation,
    invoiceInformation,
    recipientInformation,
    paymentInformation,
    servicesInformation,
    notesInformation,
  } = invoiceData;

  const getTotalInWei = () => {
    const total = getServicesTotal(servicesInformation).toString();
    const amountInWei = ethers.utils.parseUnits(total, 'ether');
    return amountInWei;
  };

  const isInvoicePaid = invoiceData.status === 'Paid';

  const { config } = usePrepareSendTransaction({
    request: {
      to: process.env.NEXT_PUBLIC_WEB3PAL_TEST_WALLET,
      value: getTotalInWei(),
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);
  const txHash = data?.hash || invoiceData.txHash || '';

  const waitForTransaction = useWaitForTransaction({
    hash: txHash,
    onSuccess: async () => saveInvoice(),
  });

  const txError = waitForTransaction.error;
  const txIsLoading = waitForTransaction.isLoading;
  const txIsSuccess = waitForTransaction.isSuccess;

  const saveInvoice = async () => {
    const fieldsToUpdate = {
      _id: invoiceData._id,
      status: 'Paid',
      txHash: txHash,
      paidTimestamp: Date.now(),
    };

    await fetch('/api/payinvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldsToUpdate),
    });
  };

  return (
    <>
      <InvoicesHeader />

      <div className="flex flex-col items-center bg-gray-50">
        {txIsSuccess || isInvoicePaid ? (
          <SuccessfulPaymentAlert txHash={txHash} />
        ) : (
          <>
            <div className="mt-5 w-[600px] text-center text-red-600">
              Pay using the button below <strong>only</strong>. Do not manually
              send funds directly to the address, or your invoice may be marked
              as unpaid.
            </div>{' '}
            <button
              type="button"
              className="m-5 inline-flex items-center rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => sendTransaction?.()}
            >
              {txIsLoading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Paying...
                </>
              ) : (
                <>Pay invoice</>
              )}
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col items-center bg-gray-50">
        {txError && <FailedPaymentAlert txHash={txHash} />}
      </div>

      <div className="flex flex-col items-center bg-slate-50">
        <div className="flex">
          <div className="mx-10 mb-5 bg-white shadow sm:rounded-lg">
            <div className="w-[600px] px-4 py-4 sm:px-6">
              <PersonalInformationSection
                personalInformation={personalInformation}
                invoiceInformation={invoiceInformation}
              />
              <RecipientInformationSection
                recipientInformation={recipientInformation}
              />
              <PaymentDetailsSection
                paymentInformation={paymentInformation}
                isForSender={true}
              />
              <div className="ml-3">
                <ServicesDisplaySection serviceData={servicesInformation} />
              </div>
              <NotesSection notesInformation={notesInformation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
