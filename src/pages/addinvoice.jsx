import { useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardDesktopSidebar from '@/components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '@/components/Dashboard/DashboardMobileSidebar';
import InvoiceDisplay from '@/components/InvoiceDisplay/InvoiceDisplay';
import { getMarketData } from '../utils/coinGeckoApi';
import { StateContext } from '../context/stateContext';
import { useContext } from 'react';

export async function getServerSideProps() {
  const marketData = await getMarketData();

  return {
    props: { marketData },
  };
}

export default function CreateInvoice(props) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;

  useEffect(() => {
    setMasterState({ ...masterState, marketData: props.marketData });
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
          <InvoiceDisplay />
        </div>
      </div>
    </>
  );
}
