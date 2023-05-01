import {
  CreditCardIcon,
  FolderIcon,
  HomeIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export const SideBarNavItems = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon, current: false },
  {
    name: 'My organisation',
    href: '/myorganisation',
    icon: BriefcaseIcon,
    current: false,
  },
  {
    name: 'My invoices',
    href: '/myinvoices',
    icon: FolderIcon,
    current: false,
  },
  {
    name: 'Add invoice',
    href: '/addinvoice',
    icon: PlusCircleIcon,
    current: false,
  },
  { name: 'Clients', href: '/clients', icon: UserIcon, current: false },
  { name: 'Wallets', href: '/wallets', icon: CreditCardIcon, current: false },
];
