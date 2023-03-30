import { useContext, useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardProfileDropDown from '@/components/Dashboard/DashboardProfileDropDown';
import DashboardDesktopSidebar from '@/components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '@/components/Dashboard/DashboardMobileSidebar';
import WalletsDisplay from '@/components/Wallets/WalletsDisplay';
import { StateContext } from '@/context/stateContext';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';
import CreateCompanyPanel from '@/components/Dashboard/CreateCompanyPanel';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }

  const organisation = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getorganisation/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: session.user.email }),
    }
  );

  const response = await organisation.json();
  if (organisation.status === 200) {
    return {
      props: { organisation: response, session: session },
    };
  } else {
    return {
      props: { organisation: false, session: session },
    };
  }
}

export default function Wallets(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { data: session } = useSession();
  const { organisation } = props;
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const organisationMasterState = masterState.organisation._id;

  useEffect(() => {
    setMasterState({ ...masterState, organisation, session });
    setIsLoading(false);
  }, []);

  console.log('props', session);

  return (
    <>
      {isLoading ? (
        ''
      ) : (
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
            </div>
            {organisationMasterState ? (
              <div className="px-10">
                <WalletsDisplay />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <CreateCompanyPanel />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
