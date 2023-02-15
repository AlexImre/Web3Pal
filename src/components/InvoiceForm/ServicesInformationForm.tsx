import EmailField from './Fields/EmailField';
import TextFieldRequired from './Fields/TextFieldWithValidation';
import CountriesField from './Fields/CountriesField';
import { StateContext } from '../../context/stateContext';
import { useContext, useState } from 'react';
import TextField from './Fields/TextField';
import toast, { Toaster } from 'react-hot-toast';
import TextFieldWithValidation from './Fields/TextFieldWithValidation';
import NumberFieldWithValidation from './Fields/NumberFieldWithValidation';
import ServicesTableRow from './ServicesTableRow';
import NumberField from './Fields/NumberField';
import ServicesModal from './ServicesModal';
import InvoiceModal from '../InvoiceModal';
import ServicesDisplaySection from '../InvoiceDisplay/ServicesDisplaySection';

export default function PersonalInformationForm() {
  const [showServicesModal, setServicesShowModal] = useState(false);
  console.log('showServicesModal', showServicesModal);

  const personalInfoToast = () => toast.success('Information updated.');
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const servicesInformation = stateContext.masterState.servicesInformation;
  const [tempServicesInfo, setTempServicesInfo] = useState(servicesInformation);
  // const {
  //   uuid,
  //   serviceId,
  //   description,
  //   quantity,
  //   price,
  //   discount,
  //   tax,
  //   amount,
  // } = tempServicesInfo[0];
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setTempServicesInfo({
      ...tempServicesInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
    // setMasterState({
    //   ...masterState,
    //   servicesInformation: tempServicesInfo,
    // });
    // personalInfoToast();
  };

  const addRow = (e: any) => {
    e.preventDefault();
    const newService = {
      uuid: '',
      serviceId: '',
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
                <ServicesDisplaySection />
                <div className="flex justify-center">
                  <button
                    className="flexmb-4 mt-4 mr-4 w-1/2 rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                    onClick={() => setServicesShowModal(true)}
                  >
                    Edit services
                  </button>
                  {showServicesModal && (
                    <ServicesModal setShowModal={setServicesShowModal} />
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
