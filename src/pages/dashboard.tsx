import { useState, useContext, useEffect } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardProfileDropDown from '../components/Dashboard/DashboardProfileDropDown';
import DashboardDesktopSidebar from '../components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '../components/Dashboard/DashboardMobileSidebar';
import HomeCard from '../components/Dashboard/HomeCard';
import CreateCompanyPanel from '../components/Dashboard/CreateCompanyPanel';
import { StateContext } from '@/context/stateContext';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { fetchInvoices, fetchOrganisation } from '@/utils/fetchData';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import EmptyInvoiceHolder from '@/components/MyInvoices/EmptyInvoiceHolder';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log('baseurl: ', process.env.NEXT_PUBLIC_BASE_URL);
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

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { data: session } = useSession();
  const { organisation, invoices } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const organisationMasterState = masterState.organisation._id;

  useEffect(() => {
    setMasterState({
      ...masterState,
      organisation,
      myInvoices: invoices,
      session,
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Home - Web3Pal</title>
        <meta
          name="google-signin-client_id"
          content="436169773174-dtov4661oe82pgn2q1oudl2d9jkgud4c.apps.googleusercontent.com"
        />
      </Head>
      <div className="min-h-full bg-slate-100">
        <DashboardMobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <DashboardDesktopSidebar />

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-slate-100 lg:border-none">
            {/* Open sidebar on mobile */}
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <DashboardProfileDropDown />
          </div>
          {isLoading ? (
            <></>
          ) : organisationMasterState ? (
            <>
              {invoices.length < 1 && <EmptyInvoiceHolder />}
              <HomeCard />
            </>
          ) : (
            <div className="flex flex-col items-center">
              <CreateCompanyPanel />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
