import { Fragment, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  ExclamationTriangleIcon,
  LifebuoyIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import RecipientInformationForm from '../InvoiceForm/RecipientInformationForm';

const users = [
  {
    id: 1,
    name: 'Leslie Alexander',
  },
  {
    id: 2,
    name: 'Terry Alexander',
  },
  {
    id: 3,
    name: 'David Alexander',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CommandPalette(props: any) {
  const { open, setOpen } = props;
  const [showAddNewClient, setShowAddNewClient] = useState(false);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

  const filteredUsers =
    rawQuery === ''
      ? users
      : users.filter((user) => user.name.toLowerCase().includes(query));

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setRawQuery('')}
      appear
    >
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                {filteredUsers.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-py-10 scroll-pb-2 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredUsers.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">
                          Clients
                        </h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredUsers.map((user) => (
                            <Combobox.Option
                              key={user.id}
                              value={user}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center px-4 py-2',
                                  active && 'bg-indigo-600 text-white'
                                )
                              }
                            >
                              <span className="ml-3 flex-auto truncate">
                                {user.name} (ADD EMAIL TOO)
                              </span>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === '?' && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <LifebuoyIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      Help with searching
                    </p>
                    <p className="mt-2 text-gray-500">
                      Use this tool to quickly search for users and projects
                      across our entire platform. You can also use the search
                      modifiers found in the footer below to limit the results
                      to just users or projects.
                    </p>
                  </div>
                )}

                {query !== '' &&
                  rawQuery !== '?' &&
                  filteredUsers.length === 0 && (
                    <div className="px-6 py-14 text-center text-sm sm:px-14">
                      <ExclamationTriangleIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        No results found
                      </p>
                      <p className="mt-2 text-gray-500">
                        We couldn’t find anything with that term. Please try
                        again.
                      </p>
                    </div>
                  )}

                <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                  <div
                    className="flex items-center hover:cursor-pointer hover:text-indigo-600"
                    onClick={() => setShowAddNewClient(!showAddNewClient)}
                  >
                    {' '}
                    <UserPlusIcon width={20} height={20} className="mr-2" />
                    Add new client{' '}
                  </div>
                </div>

                <Transition
                  show={showAddNewClient}
                  enter="transition-opacity duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <RecipientInformationForm />
                  <div className="flex flex-wrap items-center justify-end bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                    <div
                      className="flex items-center rounded-md bg-indigo-600 p-2 text-white hover:cursor-pointer hover:bg-indigo-700"
                      onClick={() => setShowAddNewClient(!showAddNewClient)}
                    >
                      {' '}
                      Add client{' '}
                    </div>
                  </div>
                </Transition>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
