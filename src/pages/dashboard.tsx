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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!

  console.log('session', session);

  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }

  const organisation = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getorganisation2`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email }),
    }
  );

  console.log('organisation: ', organisation);

  if (organisation) {
    const response = await organisation.json();
    if (organisation.status === 200) {
      return {
        props: { organisation: response },
      };
    } else {
      return {
        props: { organisation: false },
      };
    }
  } else {
    return {
      props: { organisation: false },
    };
  }
}

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { organisation } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const organisationMasterState = masterState.organisation._id;

  useEffect(() => {
    setMasterState({ ...masterState, organisation: organisation });
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
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
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
