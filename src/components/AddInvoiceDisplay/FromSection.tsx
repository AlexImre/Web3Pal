import { PencilIcon } from '@heroicons/react/24/solid';
import React from 'react';
import CommandPalette from './CommandPalette';
import { useState } from 'react';
import InvoiceModal from '../InvoiceModal';
import FromSectionModal from './FromSectionModal';

function FromSection() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-gray-900/5 pt-3 text-sm sm:pr-4">
      <div className="flex items-center space-x-3">
        <dt className="font-semibold text-gray-900">From</dt>
        <PencilIcon
          width="13"
          height="13"
          className="text-indigo-600 hover:cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>
      <FromSectionModal open={open} setOpen={setOpen} />
      <dd className="text-gray-500">
        <span className="font-medium text-gray-900">Acme, Inc.</span>
        <br />
        7363 Cynthia Pass
        <br />
        Toronto, ON N3Y 4H8
      </dd>
    </div>
  );
}

export default FromSection;
