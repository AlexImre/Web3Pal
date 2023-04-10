import { ScaleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { StateContext } from '@/context/stateContext';
import { getServicesTotal } from '../InvoiceForm/ServicesUtils';
import RecentInvoices from './RecentInvoices';
import StatusCountTable from './StatusCountTable';

export default function HomeCard() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { myInvoices } = masterState;

  const totalOrgBalanceOverdue = myInvoices.reduce((acc, invoice) => {
    if (invoice.status === 'Overdue' || invoice.status === 'Unpaid') {
      return acc + getServicesTotal(invoice.servicesInformation);
    } else {
      return acc;
    }
  }, 0);

  const totalOrgBalancePaid = myInvoices.reduce((acc, invoice) => {
    if (invoice.status === 'Paid') {
      return acc + getServicesTotal(invoice.servicesInformation);
    } else {
      return acc;
    }
  }, 0);

  // console.log('marketData[0]', marketData[0].current_price);

  const cards = [
    {
      name: 'Balance outstanding',
      href: '#',
      icon: ScaleIcon,
      amount: totalOrgBalanceOverdue,
    },
    {
      name: 'Invoices paid',
      href: '#',
      icon: ScaleIcon,
      amount: totalOrgBalancePaid,
    },
    // More items...
  ];

  return (
    <>
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                              {Intl.NumberFormat('en-US').format(card.amount)}{' '}
                              USD
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <StatusCountTable myInvoices={myInvoices} />
            </div>
          </div>

          <RecentInvoices
            myInvoices={myInvoices}
            title="Recently paid invoices"
            dataIsPaidInvoices={true}
          />

          <RecentInvoices
            myInvoices={myInvoices}
            title="Recently created invoices"
            showHeaderButtons={true}
            dataIsPaidInvoices={false}
          />
        </div>
      </main>
    </>
  );
}
