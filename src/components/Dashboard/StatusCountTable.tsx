import { StateContext } from '@/context/stateContext';
import { useContext } from 'react';
import {
  getDashboardStatusChips,
  getInvoiceStatusChip,
} from '../MyInvoices/myInvoicesUtils';

export default function StatusCountTable(props: any) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { organisation } = masterState;
  const { myInvoices } = props;

  const statuses = ['Paid', 'Overdue', 'Unpaid', 'Draft', 'Void'];
  const statusCounts = statuses.map((status) => {
    return {
      status: status,
      count: myInvoices.filter((invoice) => {
        return invoice.status === status;
      }).length,
    };
  });

  return (
    <div className="hidden sm:block">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col">
          <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
            <table className="min-h-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                    scope="col"
                  >
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {statusCounts.map((statusCount, index) => (
                  <tr key={index} className="bg-white">
                    <td className="max-w-0 whitespace-nowrap px-6 text-sm text-gray-900">
                      <div className="flex items-center justify-center">
                        <p className="truncate text-gray-500 group-hover:text-gray-900">
                          {getDashboardStatusChips(statusCount.status)}
                        </p>
                      </div>
                    </td>
                    <td className="max-w-0 whitespace-nowrap px-6 py-1 text-sm text-gray-900">
                      <div className="flex items-center justify-center">
                        <p className="text-gray-500 group-hover:text-gray-900">
                          {statusCount.count}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
