import PersonalInformationForm from './PersonalInformationForm';
import InvoiceInformationForm from './InvoiceInformationForm';
import RecipientInformationForm from './RecipientInformationForm';
import PaymentInformationForm from './PaymentInformationForm';
import ServicesInformationForm from './ServicesInformationForm';
import NotesForm from './NotesForm';
import { navigation } from './navigation';
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
    <div className="sticky lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="flex flex-col py-6 px-2 hover:cursor-pointer sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        {navigation.map((item, index) => (
          <div
            key={item.name}
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-indigo-700"
            onClick={() => {
              refs[index].current.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            <div className="flex">
              <item.icon
                className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-slate-600 group-hover:text-indigo-500"
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </div>
          </div>
        ))}
      </aside>

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
