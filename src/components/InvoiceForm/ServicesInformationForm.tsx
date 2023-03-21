import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import ServicesModal from './ServicesModal';
import ServicesDisplaySection from '../AddInvoiceDisplay/ServicesDisplaySection';
import toast from 'react-hot-toast';

export default function PersonalInformationForm() {
  const [showServicesModal, setServicesShowModal] = useState(false);
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const servicesInformation =
    stateContext.masterState.invoice.servicesInformation;
  const [tempServicesInfo, setTempServicesInfo] = useState(servicesInformation);

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

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Services Information
                </h3>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Enter information about services provided.
                </p>
                <ServicesDisplaySection serviceData={servicesInformation} />
                {showServicesModal && (
                  <ServicesModal
                    setShowModal={setServicesShowModal}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    tempServicesInfo={tempServicesInfo}
                    setTempServicesInfo={setTempServicesInfo}
                    updateServiceAmount={updateServiceAmount}
                    error={error}
                    errorMessage={errorMessage}
                  />
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <div className="flex justify-end">
                  <button
                    className="inline-flex w-20 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setServicesShowModal(true)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
