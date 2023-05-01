import React, { useContext, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { StateContext } from '@/context/stateContext';
import RecipientInformationForm from '@/components/InvoiceForm/RecipientInformationForm';
import {
  ExclamationTriangleIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ClientsDisplay() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { clients } = masterState.organisation;

  const [showAddNewClient, setShowAddNewClient] = useState(false);
  const [rawQuery, setRawQuery] = useState('');
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

  const filteredClients =
    rawQuery === ''
      ? clients
      : clients.filter((user) => user.clientName.toLowerCase().includes(query));

  const selectClient = (e, client) => {
    e.preventDefault();
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        recipientInformation: {
          ...masterState.invoice.recipientInformation,
          clientName: client.clientName,
          clientEmail: client.clientEmail,
          clientAddressLine1: client.clientAddressLine1,
          clientAddressLine2: client.clientAddressLine2,
          clientCity: client.clientCity,
          clientCounty: client.clientCounty,
          clientPostalCode: client.clientPostalCode,
          clientCountry: client.clientCountry,
        },
      },
    });
  };

  return (
    <div className="relative inset-0 z-10 mt-10 overflow-y-auto rounded-lg bg-white shadow ">
      <Combobox onChange={(item: any) => (window.location = item.url)}>
        <div className="relative bg-gray-50">
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

        {filteredClients.length > 0 && (
          <Combobox.Options
            static
            className="max-h-80 scroll-py-10 scroll-py-10 scroll-pb-2 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
          >
            {filteredClients.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold text-gray-900">Clients</h2>
                <div className="-mx-4 mt-2 text-sm text-gray-700">
                  {filteredClients.map((client) => (
                    <Combobox.Option
                      key={client.clientId}
                      value={client}
                      className={({ active }) =>
                        classNames(
                          'cursor-default select-none px-4 py-2 hover:cursor-pointer',
                          active && 'bg-indigo-600 text-white'
                        )
                      }
                      onClick={(e) => selectClient(e, client)}
                    >
                      <div className="ml-3 flex items-center justify-between truncate">
                        <div className="mr-3 flex min-w-[100px] flex-col font-semibold">
                          <div>{client.clientName}</div>
                          <div>{client.clientEmail}</div>
                        </div>{' '}
                        <div>
                          <button
                            type="button"
                            className="mr-2 inline-flex w-20 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="mr-2 inline-flex w-20 items-center justify-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Default
                          </button>
                        </div>
                      </div>
                    </Combobox.Option>
                  ))}
                </div>
              </div>
            )}
          </Combobox.Options>
        )}

        {clients.length === 0 && (
          <div className="px-6 py-14 text-center text-sm sm:px-14">
            <UserIcon
              className="mx-auto h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <p className="mt-4 font-semibold text-gray-900">
              No clients found!
            </p>
            <p className="mt-2 text-gray-500">
              Add your clients here and choose which clients will appear as
              default on newly created invoices.
            </p>
          </div>
        )}

        {query !== '' && rawQuery !== '?' && filteredClients.length === 0 && (
          <div className="px-6 py-14 text-center text-sm sm:px-14">
            <ExclamationTriangleIcon
              className="mx-auto h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <p className="mt-4 font-semibold text-gray-900">No results found</p>
            <p className="mt-2 text-gray-500">
              We couldn’t find anything with that term. Please try again.
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
          <RecipientInformationForm
            showAddNewClient={showAddNewClient}
            setShowAddNewClient={setShowAddNewClient}
          />
        </Transition>
      </Combobox>
    </div>
  );
}

export default ClientsDisplay;
