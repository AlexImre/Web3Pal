import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ArrowUpTrayIcon,
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  DocumentIcon,
  FolderIcon,
  HomeIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  BanknotesIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import DashboardProfileDropDown from './DashboardProfileDropDown'
import DashboardDesktopSidebar from './DashboardDesktopSidebar'
import DashboardMobileSidebar from './DashboardMobileSidebar'
import InvoiceDisplay from '../InvoiceDisplay/InvoiceDisplay'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My invoices', href: '#', icon: FolderIcon, current: false },
  {
    name: 'Create invoice',
    href: '#',
    icon: PlusCircleIcon,
    current: false,
  },
  { name: 'Wallets', href: '#', icon: CreditCardIcon, current: false },
]
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const cards = [
  { name: 'Balance overdue', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  {
    name: 'Invoices paid',
    href: '#',
    icon: ScaleIcon,
    amount: '$50,129.57',
  },
  // More items...
]
const transactions = [
  {
    id: 1,
    name: 'Payment to Saxon Advisors',
    href: '#',
    amount: '2.25',
    currency: 'ETH',
    status: 'success',
    date: 'January 16, 2023',
    datetime: '2023-16-01',
  },
  // More transactions...
]
const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MyInvoicesCard() {
  return (
    <>
      <InvoiceDisplay />
    </>
  )
}
