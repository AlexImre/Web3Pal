import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import FromForm from './FromForm';

export default function FromSectionModal(props) {
  const { open, setOpen } = props;
  const topOfPageRef = useRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="mt-20 flex items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
              <Dialog.Panel className="sm:min-w-sm relative transform overflow-hidden rounded-lg bg-slate-200  text-left shadow-xl transition-all  md:mx-20">
                <FromForm open={open} setOpen={setOpen} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
