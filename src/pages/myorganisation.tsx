import { useContext, useEffect, useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import DashboardProfileDropDown from '@/components/Dashboard/DashboardProfileDropDown';
import DashboardDesktopSidebar from '@/components/Dashboard/DashboardDesktopSidebar';
import DashboardMobileSidebar from '@/components/Dashboard/DashboardMobileSidebar';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { StateContext } from '@/context/stateContext';
import MyOrganisationTable from '@/components/MyOrganisation/MyOrganisationTable';
import OrganisationInformationForm from '@/components/MyOrganisation/OrganisationInformationForm';
import CreateCompanyPanel from '@/components/Dashboard/CreateCompanyPanel';
import { fetchOrganisation } from '@/utils/fetchData';
import { useSession } from 'next-auth/react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: '/auth/signin' } };
  }
  const email = session?.user?.email;

  const organisation = await fetchOrganisation(email);
  if (!organisation) {
    return { props: { organisation: false } };
  } else {
    return {
      props: { organisation },
    };
  }
}

export default function MyOrganisation(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const { organisation } = props;
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const organisationMasterState = masterState.organisation;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMasterState({ ...masterState, organisation, session });
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
          ) : organisationMasterState ? (
            <>
              <OrganisationInformationForm />
              <MyOrganisationTable />
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
