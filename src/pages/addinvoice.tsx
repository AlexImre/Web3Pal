import { useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardDesktopSidebar from '../components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '../components/Dashboard/DashboardMobileSidebar';
import AddInvoiceDisplay from '../components/AddInvoiceDisplay/AddInvoiceDisplay';
import { getMarketData } from '../utils/coinGeckoApi';
import { StateContext } from '../context/stateContext';
import { useContext } from 'react';
import { InvoiceType } from '../context/stateContext';
import { getSession, useSession } from 'next-auth/react';
import CreateCompanyPanel from '@/components/Dashboard/CreateCompanyPanel';
import {
  fetchInvoice,
  fetchInvoiceNumber,
  fetchOrganisation,
} from '@/utils/fetchData';

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req });
  const email = session?.user?.email;
  const invoiceId = query.invoiceId;

  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }

  const marketData = await getMarketData();
  const invoice = await fetchInvoice(invoiceId);
  const organisation = await fetchOrganisation(email);
  const organisationId = organisation._id;
  const invoiceNumber = await fetchInvoiceNumber(organisationId);

  return {
    props: { marketData, invoice, invoiceNumber, organisation },
  };
}

export default function CreateInvoice({
  marketData,
  invoice,
  invoiceNumber,
  organisation,
}) {
  const stateContext = useContext(StateContext);
  const { data: session } = useSession();
  const { masterState, setMasterState } = stateContext;
  const invoiceToEdit: InvoiceType = invoice[0];
  const [isLoading, setIsLoading] = useState(true);
  const organisationMasterState = masterState.organisation._id;

  useEffect(() => {
    setIsLoading(false);
    if (invoiceToEdit) {
      setMasterState({
        ...masterState,
        invoice: invoiceToEdit,
        marketData,
        organisation,
        session,
      });
    } else {
      setMasterState({
        ...masterState,
        marketData,
        organisation,
        autoGeneratedInvoiceNumber: String(invoiceNumber),
        session,
      });
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
          {isLoading ? (
            <></>
          ) : !organisationMasterState ? (
            <div className="flex flex-col items-center">
              <CreateCompanyPanel />
            </div>
          ) : (
            <AddInvoiceDisplay />
          )}
        </div>
      </div>
    </>
  );
}
