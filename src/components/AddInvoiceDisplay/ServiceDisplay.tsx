import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ServicesTableRow from '../InvoiceForm/ServicesTableRow';
import { StateContext } from '@/context/stateContext';
import toast from 'react-hot-toast';
import { invoiceLabels } from './AddInvoiceUtils';

export default function ServicesModal(props) {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const servicesInformation =
    stateContext.masterState.invoice.servicesInformation;
  const [tempServicesInfo, setTempServicesInfo] = useState(servicesInformation);
  const { invoiceLabelling } = masterState.invoice.paymentInformation;

  const invoiceLabel = invoiceLabels.find(
    (label) => label.abbreviation === invoiceLabelling
  ).symbol;

  const handleChange = (e: any, uuid: string) => {
    setTempServicesInfo(
      tempServicesInfo.map((service: any) => {
        if (service?.uuid === uuid) {
          if (e.target.name === 'description') {
            return {
              ...service,
              [e.target.name]: e.target.value,
            };
          }
          return {
            ...service,
            [e.target.name]: Number(e.target.value),
          };
        }
        return service;
      })
    );
  };

  const updateServiceAmount = (uuid: string, serviceAmount: number) => {
    setTempServicesInfo(
      tempServicesInfo.map((service: any) => {
        if (service?.uuid === uuid) {
          return {
            ...service,
            amount: serviceAmount,
          };
        }
        return service;
      })
    );
  };

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesToast = () => toast.success('Information updated.');
  const handleSave = (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage('');

    const hasMissingDescription = tempServicesInfo.some(
      (service: any) =>
        service.description === '' ||
        service.description === null ||
        service.description === undefined
    );

    if (hasMissingDescription) {
      setError(true);
      setErrorMessage('Description required');
      return;
    }

    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        servicesInformation: tempServicesInfo,
        formCompletion: {
          ...masterState.invoice.formCompletion,
          servicesInformation: true,
        },
      },
    });
    servicesToast();
  };

  let startingId = 1;
  const createId = () => {
    return startingId++;
  };

  // const setShowModal = props.setShowModal;

  const addRow = (e: any) => {
    e.preventDefault();
    const newService = {
      uuid: uuidv4(),
      serviceId: createId(),
      description: '',
      quantity: 0,
      price: 0,
      discount: 0,
      tax: 0,
      amount: 0,
    };
    setTempServicesInfo([...tempServicesInfo, newService]);
  };

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="md:col-span-2">
          <div className="sm:rounded-md">
            <div className="bg-white py-2">
              <div className="grid grid-cols-7 gap-1">
                <div className="col-span-7 text-sm font-medium text-gray-700 sm:col-span-2">
                  Description*
                </div>
                <div className="col-span-7 text-sm font-medium text-gray-700 sm:col-span-1">
                  Quantity
                </div>
                <div className="col-span-7 text-sm font-medium text-gray-700 sm:col-span-1">
                  Price
                </div>
                <div className="col-span-7 text-sm font-medium text-gray-700 sm:col-span-1">
                  Discount (%)
                </div>
                <div className="col-span-7 text-sm font-medium text-gray-700 sm:col-span-1">
                  Tax (%)
                </div>
                <div className="col-span-7 text-center text-sm font-medium text-gray-700 sm:col-span-1">
                  Amount
                </div>

                {tempServicesInfo.map((service: any, index: any) => {
                  return (
                    <ServicesTableRow
                      service={service}
                      index={index}
                      key={index}
                      tempServicesInfo={tempServicesInfo}
                      setTempServicesInfo={setTempServicesInfo}
                      handleChange={handleChange}
                      updateServiceAmount={updateServiceAmount}
                      error={error}
                      errorMessage={errorMessage}
                    />
                  );
                })}
              </div>
              <div></div>
              <div className="flex grid grid-cols-7 items-center gap-2">
                <button
                  className="col-span-2 my-1 inline-flex justify-start rounded-md py-1 px-2 text-xs font-medium text-indigo-600"
                  onClick={(e) => addRow(e)}
                >
                  + Add line item
                </button>
                <div className="text-md col-span-2 col-start-5 my-1 mt-3 text-left text-sm">
                  Amount without tax
                </div>
                <div className="text-md col-span-1 col-start-7 my-1 mt-3 text-center text-sm">
                  {invoiceLabel}00001
                </div>
                <div className="text-md col-span-2 col-start-5 my-1 text-left text-sm">
                  Total tax amount
                </div>
                <div className="text-md col-span-1 col-start-7 my-1 text-center text-sm">
                  {invoiceLabel}00001
                </div>
                <div className="text-md col-span-2 col-start-5 my-1 text-left text-sm">
                  Total Amount
                </div>
                <div className="text-md col-span-1 col-start-7 my-1 text-center text-sm">
                  {invoiceLabel}00001
                </div>
                <div className="text-md col-span-2 col-start-5 my-1 text-left text-sm">
                  Due
                </div>
                <div className="text-md col-span-1 col-start-7 my-1 text-center text-sm">
                  {invoiceLabel}00001
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
