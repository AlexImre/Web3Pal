import {
  getServicesSubtotal,
  getServicesTax,
  getServicesTotal,
} from '../InvoiceForm/ServicesUtils';

export default function ServicesDisplay(props) {
  const { serviceData } = props;

  const tax = getServicesTax(serviceData) || 0;
  const subTotal = getServicesSubtotal(serviceData) || 0;
  const total = getServicesTotal(serviceData) || 0;

  return (
    <div className="w-full pb-3 pr-3">
      <div className="flex items-center">
        <div className="w-0 flex-1">
          <div className="bg-white">
            <div className="flex flex-col sm:-mx-6 md:mx-0">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden w-20 py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="hidden w-20 py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="w-20 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="w-20 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      Tax
                    </th>
                    <th
                      scope="col"
                      className="w-20 py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceData?.map((project) => (
                    <tr
                      key={project.id}
                      className="break-all border-b border-gray-200"
                    >
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                        <div className="font-medium text-gray-900">
                          {project.description}
                        </div>
                      </td>
                      <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                        {Intl.NumberFormat('en-US').format(project.quantity)}
                      </td>
                      <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                        {Intl.NumberFormat('en-US').format(project.price)}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                        {Intl.NumberFormat('en-US').format(project.discount)}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                        {Intl.NumberFormat('en-US').format(project.tax)}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                        {Intl.NumberFormat('en-US').format(project.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan={5}
                      className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                      {Intl.NumberFormat('en-US').format(subTotal)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={5}
                      className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                    >
                      Tax
                    </th>
                    <th
                      scope="row"
                      className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      Tax
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                      {Intl.NumberFormat('en-US').format(tax)}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={5}
                      className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                    >
                      Total
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                      {Intl.NumberFormat('en-US').format(total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
