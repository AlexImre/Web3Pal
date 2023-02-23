import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast, { Toaster } from 'react-hot-toast';
import ServicesTableRow from './ServicesTableRow';
import { v4 as uuidv4 } from 'uuid';

export default function ServicesModal(props) {
  const [showServicesModal, setServicesShowModal] = useState(false);
  const servicesToast = () => toast.success('Information updated.');
  const [open, setOpen] = useState(true);

  let startingId = 1;
  const createId = () => {
    return startingId++;
  };

  const {
    handleSave,
    handleChange,
    tempServicesInfo,
    setTempServicesInfo,
    updateServiceAmount,
  } = props;

  const setShowModal = props.setShowModal;

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-100 bg-gradient-to-r from-indigo-600 to-indigo-500 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="sm:min-w-sm relative my-10 transform overflow-hidden rounded-lg bg-slate-200 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:p-6 md:mx-20">
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
                          <div className="grid grid-cols-8 gap-2">
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-2">
                              Description
                            </div>
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-1">
                              Quantity
                            </div>
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-1">
                              Price
                            </div>
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-1">
                              Discount (%)
                            </div>
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-1">
                              Tax (%)
                            </div>
                            <div className="col-span-8 text-sm font-medium text-gray-700 sm:col-span-1">
                              Amount
                            </div>

                            {tempServicesInfo.map(
                              (service: any, index: any) => {
                                return (
                                  <ServicesTableRow
                                    service={service}
                                    index={index}
                                    key={index}
                                    tempServicesInfo={tempServicesInfo}
                                    setTempServicesInfo={setTempServicesInfo}
                                    handleChange={handleChange}
                                    updateServiceAmount={updateServiceAmount}
                                  />
                                );
                              }
                            )}
                          </div>
                          <div>
                            <button
                              className="my-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={(e) => addRow(e)}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                          <button
                            className="inline-flex justify-center rounded-md border border-transparent bg-slate-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                            onClick={(e) => {
                              servicesToast();
                              handleSave(e);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Back
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
