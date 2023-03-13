import { useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardDesktopSidebar from '../components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '../components/Dashboard/DashboardMobileSidebar';
import AddInvoiceDisplay from '../components/AddInvoiceDisplay/AddInvoiceDisplay';
import { getMarketData } from '../utils/coinGeckoApi';
import { StateContext } from '../context/stateContext';
import { useContext } from 'react';
import { InvoiceType } from '../context/stateContext';

export async function getServerSideProps({ query }) {
  const marketData = await getMarketData();
  const invoiceId = query.invoiceId;

  const fetchInvoice = await fetch(
    `http://localhost:3000/api/view/${invoiceId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const invoice = await fetchInvoice.json();

  return {
    props: { marketData, invoice },
  };
}

// MOVE Market data to its own separate context
// If Invoice is PAID, show PAID on page and don't allow any edits

export default function CreateInvoice({ marketData, invoice }) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const invoiceToEdit: InvoiceType = invoice[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (invoiceToEdit) {
      setMasterState({
        ...masterState,
        invoice: invoiceToEdit,
      });
    } else {
      setMasterState({ ...masterState, marketData: marketData });
    }
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardMobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <DashboardDesktopSidebar />
      <div className="min-h-full bg-slate-100">
        <div className="flex flex-1 flex-col bg-slate-100 lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white md:hidden lg:border-none">
            {/* Open sidebar on mobile */}
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {isLoading ? <></> : <AddInvoiceDisplay />}
        </div>
      </div>
    </>
  );
}