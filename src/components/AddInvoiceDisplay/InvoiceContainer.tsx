import { Fragment, useContext, useState } from 'react';
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid';
import { PencilIcon } from '@heroicons/react/24/solid';
import InvoiceProgressBar from './InvoiceProgressBar';
import InvoiceLabellingDropDown from '../InvoiceForm/InvoiceLabellingDropDown';
import CommandPalette from './ToCommandPalette';
import FromSection from './FromSection';
import ToSection from './ToSection';
import ServiceDisplay from './ServiceDisplay';
import TextArea from '../InvoiceForm/Fields/TextArea';
import IssueBox from './IssueBox';
import DateFieldWithValidation from '../InvoiceForm/Fields/DateFieldWithValidation';
import DatePicker from './DatePickerReact';
import { StateContext } from '@/context/stateContext';

const marketCaps = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    cap: '$250B',
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    image:
      'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663',
    cap: '$81B',
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    cap: '$32B',
  },
];

const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function InvoiceContainer() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { issueDate } = masterState.invoice.invoiceInformation;
  function convertDateStringToInputFormat(
    arg0: string
  ): import('react').ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <main>
        <header className="relative isolate">
          <div
            className="absolute inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#4F46E5] to-[#4F46E5]"
                style={{
                  clipPath:
                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <h1>
                  <div className="text-xl font-semibold leading-6 text-indigo-500">
                    DRAFT
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <button
                  type="button"
                  className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
                >
                  Save draft
                </button>
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </a>

                <Menu as="div" className="relative sm:hidden">
                  <Menu.Button className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="button"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900'
                            )}
                          >
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4 ">
          <div className="flex justify-between space-x-0 xl:space-x-6">
            <div className="mx-auto grid w-full max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Invoice */}
              <div className="-mx-4 bg-white px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-3 lg:row-span-2 lg:row-end-2 xl:p-8">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2 col-start-1">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-base text-xl font-semibold leading-6 text-gray-900">
                        Invoice #00011
                      </h2>
                      <PencilIcon
                        width="16"
                        height="16"
                        className="text-indigo-600"
                      />
                      <span className="text-sm">issued in</span>
                      <IssueBox />
                      {/* <InvoiceLabellingDropDown /> */}
                    </div>
                  </div>

                  <div className="col-span-2 col-start-3 text-sm">
                    <div className="flex items-center">
                      <dt className="mr-1 inline text-gray-500">Issued on</dt>{' '}
                      <dd className="inline text-gray-500">
                        {/* <time dateTime="2023-23-01">January 23, 2023</time> */}
                        <div>
                          {new Date(issueDate)
                            .toDateString()
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </div>
                      </dd>
                      <DatePicker />
                    </div>
                    <div className="flex items-center font-medium">
                      <dt className="mr-1 inline text-gray-900">Due on</dt>{' '}
                      <dd className="inline text-gray-700">
                        <time dateTime="2023-31-01">January 31, 2023</time>
                      </dd>
                      <PencilIcon
                        width="13"
                        height="13"
                        className="ml-3 text-indigo-600"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between"></div> */}

                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                  <FromSection />
                  <ToSection />
                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                </div>

                {/* <div className="mt-3 border-t border-gray-900/5 pt-3 text-sm">
                  <dt className="font-semibold text-gray-900">Currency</dt>
                  <dd className="text-gray-500">
                    <p className="mt-2 text-xs text-gray-500">
                      Specify the currency that your invoice will be issued in.{' '}
                      <span className="font-semibold">
                        More currencies coming soon.
                      </span>
                    </p>
                    <span className="text-gray-500">
                      Choose your invoice currency
                    </span>
                  </dd>
                </div> */}

                <div className="flex grid grid-cols-4 gap-1">
                  <div className="col-span-2 col-start-1">
                    <div className="text-sm">
                      <dt className="font-semibold text-gray-900">
                        Choose what you want to be paid in
                      </dt>

                      <div className="relative flex items-center justify-start gap-x-1 py-2.5">
                        {marketCaps.map((marketCap, index) => {
                          return (
                            <div className="flex items-start" key={index}>
                              <div className="flex items-center justify-start rounded-lg border border-slate-400 bg-white px-2 py-1 hover:cursor-pointer hover:bg-slate-100">
                                <img
                                  className="h-5 w-5 rounded-full"
                                  src={marketCap.image}
                                  alt=""
                                />
                                <div className="ml-2 flex text-xs text-slate-200">
                                  <div className="mr-1 text-slate-800">
                                    {marketCap.symbol}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 col-start-3">
                    <div className="text-sm">
                      <dt className="text-sm font-semibold text-gray-900">
                        Where do you want to receive your money?
                      </dt>
                      <dd className="text-gray-500">
                        <span className="text-gray-500">
                          Choose your wallet
                        </span>
                      </dd>
                    </div>
                  </div>
                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                </div>

                {/* <div className="mt-3 border-t border-gray-900/5 pt-3 text-sm">
                  <dt className="font-semibold text-gray-900">Services</dt>
                </div> */}
                <ServiceDisplay />
                <div className="col-span-4 my-3 border-t border-gray-300"></div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-2 col-start-1">
                    <TextArea />
                  </div>
                  <div className="col-span-2 col-start-3">
                    <div className="px-5 text-sm font-semibold">
                      Attach files
                    </div>
                    <button className="my-1 inline-flex justify-start rounded-md py-1 px-5 text-xs font-medium text-indigo-600">
                      + Add attachment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky top-0 flex h-auto justify-end self-start">
              <InvoiceProgressBar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
