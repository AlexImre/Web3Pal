import { Web3Button } from '@web3modal/react';
import Link from 'next/link';

export default function InvoicesHeader() {
  return (
    <header className="flex items-baseline justify-between bg-gray-900">
      <nav className="max-w-7xl p-6 lg:px-8" aria-label="Global">
        <Link href="/">
          <div className="text-xl font-bold text-white">
            Web3<span className="text-indigo-500">Pal</span>
          </div>
        </Link>
        <div className="flex lg:flex-1"></div>
      </nav>
      <div className="mx-5 flex items-center">
        <Web3Button icon="show" />
        <button
          type="button"
          className="ml-4 inline-flex w-32 justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
        >
          Pay now
        </button>
      </div>
    </header>
  );
}
