import { ScaleIcon } from '@heroicons/react/24/outline';
import { BanknotesIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { StateContext } from '@/context/stateContext';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';
import { getInvoiceStatus } from '../AddInvoiceDisplay/GetInvoiceStatus';
import { getInvoiceStatusChip } from '../MyInvoices/myInvoicesUtils';
import RecentInvoices from './RecentInvoices';

const cards = [
  { name: 'Balance overdue', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  {
    name: 'Invoices paid',
    href: '#',
    icon: ScaleIcon,
    amount: '$50,129.57',
  },
  // More items...
];
const transactions = [
  {
    id: 1,
    name: 'Payment to Saxon Advisors',
    href: '#',
    amount: '2.25',
    currency: 'ETH',
    status: 'success',
    date: 'January 16, 2023',
    datetime: '2023-16-01',
  },
  // More transactions...
];
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HomeCard() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices } = masterState;

  // sort invoices by createdTimestamp
  const sortedInvoices = myInvoices.sort((a, b) => {
    const date1 = new Date(a.createdTimestamp);
    const date2 = new Date(b.createdTimestamp);

    const timestamp1 = BigInt(date1.getTime());
    const timestamp2 = BigInt(date2.getTime());

    return parseInt(timestamp2.toString()) - parseInt(timestamp1.toString());
  });

  // take the first 5 invoices
  const recentPaidInvoices = sortedInvoices.filter((invoice) => {
    return invoice.status === 'Paid';
  });

  const recentPublishedInvoices = sortedInvoices
    .filter((invoice) => {
      return invoice.status !== 'Draft';
    })
    .slice(0, 3);

  console.log('recentInvoices', recentPublishedInvoices);

  return (
    <>
      <main className="flex-1 pb-8">
        {/* Page header */}
        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="overflow-hidden rounded-lg bg-white shadow"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="truncate text-sm font-medium text-gray-500">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
                        className="font-medium text-blue-700 hover:text-blue-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RecentInvoices
            invoices={recentPaidInvoices}
            title="Recently paid invoices"
          />
          <RecentInvoices
            invoices={recentPublishedInvoices}
            title="Recently published invoices"
          />
        </div>
      </main>
    </>
  );
}
