import { getDashboardStatusChips } from '../MyInvoices/myInvoicesUtils';
import { getInvoiceStatus } from '../AddInvoiceDisplay/GetInvoiceStatus';

export default function StatusCountTable(props: any) {
  const { myInvoices } = props;

  const statusCounts = myInvoices.reduce((acc, invoice) => {
    const status = getInvoiceStatus(invoice);
    const statusCount = acc.find(
      (statusCount) => statusCount.status === status
    );
    if (statusCount) {
      statusCount.count++;
    } else {
      acc.push({ status: status, count: 1 });
    }
    return acc;
  }, []);

  const validStatusCounts = statusCounts.filter((item) => {
    return item.status !== 'Void' && item.status !== 'Archived';
  });

  validStatusCounts.sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  return (
    <div className="block">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col">
          <div className="min-w-full overflow-hidden overflow-x-auto rounded-lg align-middle shadow">
            <table className="min-h-full min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-900">
                <tr>
                  <th
                    className="px-6 py-3 text-center text-sm font-semibold text-white"
                    scope="col"
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-3 text-center text-sm font-semibold text-white"
                    scope="col"
                  >
                    Count
                  </th>
                </tr>
              </thead>
              {myInvoices.length === 0 && (
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr className="bg-white">
                    <td className="max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      <div className="flex">
                        <p className="text-gray-500 group-hover:text-gray-900">
                          No invoices found!
                        </p>
                      </div>
                    </td>
                    <td className="max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900"></td>
                  </tr>
                </tbody>
              )}
              <tbody className="divide-y divide-gray-200 bg-white">
                {validStatusCounts.map((statusCount, index) => (
                  <tr key={index} className="bg-white">
                    <td className="max-w-0 whitespace-nowrap px-6 text-sm text-gray-900">
                      <div className="flex items-center justify-center">
                        <div className="truncate text-gray-500 group-hover:text-gray-900">
                          {getDashboardStatusChips(statusCount.status)}
                        </div>
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
