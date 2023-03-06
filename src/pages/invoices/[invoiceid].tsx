import NotesSection from '@/components/AddInvoiceDisplay/NotesSection';
import PaymentDetailsSection from '@/components/AddInvoiceDisplay/PaymentDetailsSection';
import PersonalInformationSection from '@/components/AddInvoiceDisplay/PersonalInformationSection';
import RecipientInformationSection from '@/components/AddInvoiceDisplay/RecipientInformationSection';
import ServicesDisplaySection from '@/components/AddInvoiceDisplay/ServicesDisplaySection';
import InvoicesHeader from '@/components/Invoices/InvoicesHeader';
import React from 'react';

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

  return (
    <>
      <InvoicesHeader />
      <div className="flex flex-col items-center bg-slate-50">
        <div>You have received an invoice from XX</div>
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
    </>
  );
}

export default invoice;
