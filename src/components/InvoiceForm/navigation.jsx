import {
  CreditCardIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  UserGroupIcon,
  CalendarIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Personal Information',
    href: '#personalInfo',
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: 'Invoice Information',
    href: '#invoiceInfo',
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
    href: '#paymentInfo',
    icon: CreditCardIcon,
    current: false,
  },
  {
    name: 'Services Provided',
    href: '#servicesInfo',
    icon: BriefcaseIcon,
    current: false,
  },
  { name: 'Notes', href: '#', icon: SquaresPlusIcon, current: false },
];
