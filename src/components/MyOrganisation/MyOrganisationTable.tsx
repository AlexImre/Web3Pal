import { StateContext } from '@/context/stateContext';
import { useContext } from 'react';
import PermissionToggle from './PermissionToggle';

export default function MyOrganisationTable() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { organisation } = masterState;
  const { members, admins } = organisation;

  const getPermissionStatus = (member: string) => {
    if (admins.includes(member)) {
      return 'Admin';
    } else {
      return 'Member';
    }
  };

  return (
    <div className="mx-10 mb-10 bg-white sm:rounded-md">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="p-10">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <p className="text-lg font-medium leading-6 text-gray-900">
                    Team
                  </p>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-my-5 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Member
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {members.map((person) => (
                            <tr key={person}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {person}
                              </td>
                              <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {getPermissionStatus(person)}
                                <PermissionToggle />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mb-2 flex justify-end pt-5 sm:flex-auto">
                      <button
                        type="button"
                        className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add user
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
