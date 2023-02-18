import PersonalInformationForm from './PersonalInformationForm';
import InvoiceInformationForm from './InvoiceInformationForm';
import RecipientInformationForm from './RecipientInformationForm';
import PaymentInformationForm from './PaymentInformationForm';
import ServicesInformationForm from './ServicesInformationForm';
import NotesForm from './NotesForm';
import InvoiceFormNavbar from './InvoiceFormNavbar';
import { createRef } from 'react';

export default function InvoiceForm() {
  const personalRef = createRef();
  const invoiceRef = createRef();
  const recipientRef = createRef();
  const paymentRef = createRef();
  const servicesRef = createRef();
  const notesRef = createRef();
  const refs = [
    personalRef,
    invoiceRef,
    recipientRef,
    paymentRef,
    servicesRef,
    notesRef,
  ];

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <InvoiceFormNavbar refs={refs} />

      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section ref={personalRef}>
          <PersonalInformationForm />
        </section>

        <section ref={invoiceRef}>
          <InvoiceInformationForm />
        </section>

        <section ref={recipientRef}>
          <RecipientInformationForm />
        </section>

        <section ref={paymentRef}>
          <PaymentInformationForm />
        </section>

        <section ref={servicesRef}>
          <ServicesInformationForm />
        </section>

        <section ref={notesRef}>
          <NotesForm />
        </section>
      </div>
    </div>
  );
}
