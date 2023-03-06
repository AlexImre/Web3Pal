import NotesSection from '@/components/AddInvoiceDisplay/NotesSection';
import PaymentDetailsSection from '@/components/AddInvoiceDisplay/PaymentDetailsSection';
import PersonalInformationSection from '@/components/AddInvoiceDisplay/PersonalInformationSection';
import RecipientInformationSection from '@/components/AddInvoiceDisplay/RecipientInformationSection';
import ServicesDisplaySection from '@/components/AddInvoiceDisplay/ServicesDisplaySection';
import InvoicesHeader from '@/components/Invoices/InvoicesHeader';
import React from 'react';
import { makePayment } from '@/components/Web3/Web3';

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

function invoice(props) {
  const { invoice } = props;
  const invoiceClientSide = invoice[0];

  const {
    personalInformation,
    invoiceInformation,
    recipientInformation,
    paymentInformation,
    servicesInformation,
    notesInformation,
  } = invoiceClientSide;

  // console.log(getBalance('0xA1077507Fc680f3dd724CA0104db58Ab23893855'));

  return (
    <>
      <InvoicesHeader />

      <button
        type="button"
        className="ml-4 inline-flex w-72 justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        onClick={() =>
          makePayment(
            '0xE41e906819746C457F8004C50385035e48F3D7A8',
            '0xA1077507Fc680f3dd724CA0104db58Ab23893855',
            0.01
          )
        }
      >
        MAKE PAYMENT TEST
      </button>

      <div className="flex flex-col items-center bg-slate-50">
        <div className="flex">
          <div className="m-10 bg-white shadow sm:rounded-lg">
            <div className="w-[600px] px-4 py-4 sm:px-6">
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
        </div>
      </div>
    </>
  );
}

export default invoice;
