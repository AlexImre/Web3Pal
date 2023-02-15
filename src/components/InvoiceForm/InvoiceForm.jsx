import PersonalInformationForm from './PersonalInformationForm';
import InvoiceInformationForm from './InvoiceInformationForm';
import RecipientInformationForm from './RecipientInformationForm';
import PaymentInformationForm from './PaymentInformationForm';
import ServicesInformationForm from './ServicesInformationForm';
import { NavLink } from '../NavLink';
import { navigation } from './navigation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function InvoiceForm() {
  return (
    <div className="sticky lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="flex flex-col py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        {navigation.map((item) => (
          <NavLink
            href={item.href}
            smooth
            key={item.name}
            className={classNames(
              item.current
                ? 'bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700'
                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <div className="flex">
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-slate-600 group-hover:text-indigo-500'
                    : 'text-slate-600 group-hover:text-gray-500',
                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </div>
          </NavLink>
        ))}
      </aside>

      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section id="personalInfo">
          <PersonalInformationForm />
        </section>

        <section id="invoiceInfo">
          <InvoiceInformationForm />
        </section>

        <section id="recipientInfo">
          <RecipientInformationForm />
        </section>

        <section id="paymentInfo">
          <PaymentInformationForm />
        </section>

        <section id="servicesInfo">
          <ServicesInformationForm />
        </section>
      </div>
    </div>
  );
}
