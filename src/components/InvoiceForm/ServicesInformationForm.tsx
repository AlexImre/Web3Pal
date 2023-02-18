import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import ServicesModal from './ServicesModal';
import ServicesDisplaySection from '../InvoiceDisplay/ServicesDisplaySection';

export default function PersonalInformationForm() {
  const [showServicesModal, setServicesShowModal] = useState(false);
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const servicesInformation = stateContext.masterState.servicesInformation;
  const [tempServicesInfo, setTempServicesInfo] = useState(servicesInformation);
  const [error, setError] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    // if (clientName === '') {
    //   setError(true);
    //   return;
    // } else if (clientEmail === '' || !clientEmail.includes('@')) {
    //   setError(true);
    //   return;
    // } else {
    //   setError(false);
    // }
    setMasterState({
      ...masterState,
      servicesInformation: tempServicesInfo,
    });
    console.log(
      'masterState.servicesInformation',
      masterState.servicesInformation[0]
    );
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
                <ServicesDisplaySection serviceData={tempServicesInfo} />
                {showServicesModal && (
                  <ServicesModal
                    setShowModal={setServicesShowModal}
                    handleSave={handleSave}
                    handleChange={handleChange}
                    tempServicesInfo={tempServicesInfo}
                    setTempServicesInfo={setTempServicesInfo}
                    updateServiceAmount={updateServiceAmount}
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
