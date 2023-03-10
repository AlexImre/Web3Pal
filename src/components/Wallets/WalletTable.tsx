import { Fragment } from 'react';

const wallets = [
  {
    name: 'Business A',
    people: [
      {
        name: 'Wallet 1',
        title: 'x01...123',
        email: 'Main wallet',
      },
      {
        name: 'Wallet 2',
        title: 'x03...456',
        email: 'Burner wallet',
      },
    ],
  },
  {
    name: 'Business B',
    people: [
      {
        name: 'Wallet 1',
        title: 'x01...123',
        email: 'Main wallet',
      },
      {
        name: 'Wallet 2',
        title: 'x03...456',
        email: 'Burner wallet',
      },
    ],
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  return (
    <div className="">
      <div className="mt-4 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle lg:px-8">
            <table className="min-w-full">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="text-md py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-md px-3 py-3.5 text-left font-semibold text-gray-900"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="text-md px-3 py-3.5 text-left font-semibold text-gray-900"
                  >
                    Notes
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {wallets.map((location) => (
                  <Fragment key={location.name}>
                    <tr className="border-t border-gray-200">
                      <th
                        colSpan={5}
                        scope="colgroup"
                        className="bg-indigo-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        {location.name}
                      </th>
                    </tr>
                    {location.people.map((person, personIdx) => (
                      <tr
                        key={person.email}
                        className={classNames(
                          personIdx === 0
                            ? 'border-gray-300'
                            : 'border-gray-200',
                          'border-t'
                        )}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {person.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
