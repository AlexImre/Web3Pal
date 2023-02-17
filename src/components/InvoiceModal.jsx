import { Fragment, useState, createRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InvoiceForm from './InvoiceForm/InvoiceForm';

export default function Modal(props) {
  const [open, setOpen] = useState(true);
  const setShowModal = props.setShowModal;
  const topOfPageRef = createRef();

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
                <InvoiceForm />
                <div className="mt-5 flex sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-32 justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {
                      topOfPageRef.current.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }}
                  >
                    Go to top
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Back to invoice
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
