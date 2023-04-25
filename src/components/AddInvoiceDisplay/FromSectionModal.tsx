import { Fragment, useState, createRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InvoiceForm from '../InvoiceForm/InvoiceForm';
import PersonalInformationForm from '../InvoiceForm/PersonalInformationForm';

export default function FromSectionModal(props) {
  const { open, setOpen } = props;
  const setShowModal = props.setShowModal;
  const topOfPageRef = createRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
          <div
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            id="testDiv"
            ref={topOfPageRef}
          >
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
                <PersonalInformationForm />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
