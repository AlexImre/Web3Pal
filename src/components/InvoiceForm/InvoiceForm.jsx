import {
  CreditCardIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserGroupIcon,
  CalendarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

import PersonalInformationForm from './PersonalInformationForm'
import DateSection from './DateSection'
import ToSection from './ToSection'
import { NavLink } from '@/components/NavLink'
import { useState } from 'react'

const navigation = [
  {
    name: 'Personal Information',
    href: '#personalInfo',
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: 'Date Information',
    href: '#dateInfo',
    icon: CalendarIcon,
    current: false,
  },
  {
    name: 'Recipient Information',
    href: '#recipientInfo',
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: 'Payment Information',
    href: '#',
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: 'Services Provided',
    href: '#',
    icon: BriefcaseIcon,
    current: false,
  },
  { name: 'Notes', href: '#', icon: SquaresPlusIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [tempFromObject, setTempFromObject] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setTempFromObject({ ...tempFromObject, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tempFromObject.firstName === '' || tempFromObject.lastName === '') {
      setError(true)
      return
    } else if (
      tempFromObject.email === '' ||
      !tempFromObject.email.includes('@')
    ) {
      setError(true)
      return
    } else {
      setError(false)
    }
  }
  return (
    <div className="sticky lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="flex flex-col py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        {navigation.map((item) => (
          <NavLink
            href={item.href}
            key={item.name}
            className={classNames(
              item.current
                ? 'bg-gray-50 text-indigo-700 hover:bg-white hover:text-indigo-700'
                : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <div className="flex">
              <item.icon
                className={classNames(
                  item.current
                    ? 'text-slate-600 group-hover:text-indigo-500'
                    : 'text-slate-600 group-hover:text-gray-500',
                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </div>
          </NavLink>
        ))}
      </aside>

      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section>
          <PersonalInformationForm />
        </section>

        <section id="dateInfo">
          <DateSection />
        </section>

        <section id="recipientInfo">
          <ToSection />
        </section>
      </div>
    </div>
  )
}
