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
    icon: UserCircleIcon,
  },
  {
    name: 'Invoice Information',
    icon: CalendarIcon,
  },
  {
    name: 'Recipient Information',
    icon: UserGroupIcon,
  },
  {
    name: 'Payment Information',
    icon: CreditCardIcon,
  },
  {
    name: 'Services Provided',
    icon: BriefcaseIcon,
  },
  { name: 'Notes', icon: SquaresPlusIcon },
];
