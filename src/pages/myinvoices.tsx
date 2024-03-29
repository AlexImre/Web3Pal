import { useContext, useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardProfileDropDown from '@/components/Dashboard/DashboardProfileDropDown';
import DashboardDesktopSidebar from '@/components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '@/components/Dashboard/DashboardMobileSidebar';
import MyInvoicesDisplay from '../components/MyInvoices/MyInvoicesDisplay';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { StateContext, TempServicesInfoContext } from '@/context/stateContext';
import EmptyInvoiceHolder from '@/components/MyInvoices/EmptyInvoiceHolder';
import CreateCompanyPanel from '@/components/Dashboard/CreateCompanyPanel';
import { fetchInvoices, fetchOrganisation } from '@/utils/fetchData';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const email = session?.user?.email;
  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }

  const organisation = await fetchOrganisation(email);
  if (!organisation) {
    return { props: { organisation: false, invoices: [] } };
  } else {
    const organisationId = organisation._id;
    const invoices = (await fetchInvoices(organisationId)) || [];
    return {
      props: { organisation, invoices },
    };
  }
}

export default function MyInvoices(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const { invoices, organisation } = props;
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;

  const { myInvoices } = masterState;
  const [isLoading, setIsLoading] = useState(true);
  const organisationMasterState = masterState.organisation._id;

  useEffect(() => {
    setMasterState({
      ...masterState,
      myInvoices: invoices,
      organisation,
      session,
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="min-h-full bg-slate-100">
        <DashboardMobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <DashboardDesktopSidebar />

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex flex-shrink-0 border-b border-gray-200 bg-white lg:h-0 lg:border-none">
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
          ) : myInvoices.length > 0 ? (
            <div className="flex flex-col justify-end">
              {/* <TempServicesInfoContext.Provider
                value={{ tempServicesInfo, setTempServicesInfo }}
              > */}
              <MyInvoicesDisplay />
              {/* </TempServicesInfoContext.Provider> */}
            </div>
          ) : (
            <EmptyInvoiceHolder />
          )}
        </div>
      </div>
    </>
  );
}
