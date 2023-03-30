import { StateContext } from '@/context/stateContext';
import { useContext } from 'react';

export default function MyOrganisationTable() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { organisation } = masterState;
  const wallets = organisation.wallets;

  const handleRemoveWallet = async (walletAddress: string) => {
    const removeWallet = await fetch('/api/removewallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organisation_id: organisation._id,
        walletAddress: walletAddress,
      }),
    });

    if (removeWallet.status === 200) {
      const newWallets = [...wallets];
      const index = newWallets.findIndex(
        (wallet) => wallet.walletAddress === walletAddress
      );
      newWallets.splice(index, 1);
      setMasterState({
        ...masterState,
        organisation: { ...organisation, wallets: newWallets },
      });
    }
  };

  return (
    <div className="mb-10 max-w-4xl bg-white sm:rounded-md">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="p-10">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <div className="text-2xl font-semibold text-slate-900">
                    Wallets
                  </div>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -mt-5 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Chain
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Address
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            ></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {wallets.map((wallet) => (
                            <tr key={wallet.walletAddress}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {wallet.walletName}
                              </td>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                Chain
                              </td>
                              <td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {wallet.walletAddress}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() =>
                                    handleRemoveWallet(wallet.walletAddress)
                                  }
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
