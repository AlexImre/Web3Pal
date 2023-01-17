import React from 'react'
import ServicesDisplaySection from './ServicesDisplaySection'
import { ScaleIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import InvoiceModal from '@/components/InvoiceModal'
import { useState } from 'react'

import { PaperClipIcon } from '@heroicons/react/20/solid'
import { TextField } from '../Fields'
import PersonalInformationSection from './PersonalInformationSection'
import RecipientInformationSection from './RecipientInformationSection'
import PaymentDetailsSection from './PaymentDetailsSection'
import NotesSection from './NotesSection'

export default function InvoiceDisplay() {
  const [showModal, setShowModal] = useState(false)
  const addUser = async () => {
    const addedUser = await fetch('/api/addInvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: '123',
        name: 'John Doe',
        invoices: [
          {
            id: 'invoice1',
            fromSection: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@gmail.com',
            },
            toSection: {
              clientName: 'Sherbs',
              clientEmail: 'sherbs@sherbs.com',
            },
            services: [
              { id: 'service1', amount: 100 },
              { id: 'service2', amount: 200 },
            ],
          },
          {
            id: 'invoice2',
            services: [
              { id: 'service1', amount: 100 },
              { id: 'service2', amount: 200 },
            ],
          },
        ],
        wallets: [
          { id: 'wallet1', amount: 1000 },
          { id: 'wallet2', amount: 2000 },
        ],
      }),
    })
    const data = addedUser
    console.log(data)
  }

  return (
    <>
      <div className="m-10 flex max-w-2xl flex-col justify-center">
        <div className="-mt-5 flex items-baseline justify-between">
          <div className="text-2xl font-semibold text-slate-900">
            Invoice template
          </div>
          <div>
            <button className="mb-4 mr-4 w-20 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              New
            </button>
            <button
              className="mb-4 mr-4 w-20 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Edit
            </button>
            {showModal && <InvoiceModal setShowModal={setShowModal} />}
            <button className="mb-4 w-20 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Export
            </button>
          </div>
        </div>
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <PersonalInformationSection />

            <RecipientInformationSection />

            <PaymentDetailsSection />

            <ServicesDisplaySection />

            <NotesSection />
          </div>
        </div>
      </div>
    </>
  )
}

// example of smokey borders incase I need
{
  /* <div className="flex flex-col md:flex-row">
<div className="mt-5 w-full px-4 sm:px-6 lg:px-8">
  <div className="mt-2">
    <div className="low-hidden rounded-lg bg-white shadow">
      <div className="p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Notes
            </div>
            <div className="truncate text-sm font-medium text-gray-700">
              Lovely job, thank you!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */
}
