import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ServicesModal from './ServicesModal';
import ServicesDisplaySection from '../InvoiceDisplay/ServicesDisplaySection';

export default function PersonalInformationForm() {
  const [showServicesModal, setServicesShowModal] = useState(false);
  const personalInfoToast = () => toast.success('Information updated.');
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const servicesInformation = stateContext.masterState.servicesInformation;
  const [tempServicesInfo, setTempServicesInfo] = useState(servicesInformation);
  const [error, setError] = useState(false);

  const handleChange = (e: any, uuid: string) => {
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', typeof e.target.value);
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
    // personalInfoToast();
  };

  return (
    <>
      <div style={{ position: 'sticky' }}>
        <Toaster containerStyle={{ position: 'sticky' }} />
      </div>
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
                <ServicesDisplaySection tempServicesInfo={tempServicesInfo} />
                <div className="flex justify-center">
                  <button
                    className="flexmb-4 mt-4 mr-4 w-1/2 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={() => setServicesShowModal(true)}
                  >
                    Edit services
                  </button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
