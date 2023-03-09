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
      </div>
    </header>
  );
}
