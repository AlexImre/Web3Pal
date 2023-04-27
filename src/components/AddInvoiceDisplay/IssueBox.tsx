import { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import USFlag from '@/images/US.svg';
import GBFlag from '@/images/GB.svg';
import { StateContext } from '@/context/stateContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function IssueBox() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { invoiceLabelling } = masterState.invoice.paymentInformation;

  const handleChange = (name: string) => {
    setMasterState({
      ...masterState,
      invoice: {
        ...masterState.invoice,
        paymentInformation: {
          ...masterState.invoice.paymentInformation,
          invoiceLabelling: name,
        },
      },
    });
  };

  const labels = [
    {
      name: 'USD',
      symbol: '$',
      image: <Image alt="" width={20} height={20} src={USFlag} />,
    },
    {
      name: 'GBP',
      symbol: '£',
      image: <Image alt="" width={20} height={20} src={GBFlag} />,
    },
    {
      name: 'ETH',
      symbol: 'ETH',
      image: (
        <Image
          alt=""
          width={20}
          height={20}
          src={'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}
        />
      ),
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex min-w-[60px] items-center justify-center rounded-full bg-indigo-600 px-3 py-1 text-center text-white hover:bg-indigo-700">
          <span className="sr-only">Open options</span>
          <span className="text-md">{invoiceLabelling}</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {labels.map((label) => {
              return (
                <Menu.Item key={label.name}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block flex px-4 py-2 text-sm'
                      )}
                      onClick={() => handleChange(label.name)}
                    >
                      {label.image}{' '}
                      <span className="ml-3 font-medium">{label.name}</span>
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
