import Image from 'next/image';
import USFlag from '@/images/US.svg';
import GBFlag from '@/images/GB.svg';

export const invoiceLabels = [
  {
    name: 'US Dollar',
    abbreviation: 'USD',
    symbol: '$',
    image: <Image alt="" width={20} height={20} src={USFlag} />,
  },
  {
    name: 'British Pound',
    abbreviation: 'GBP',
    symbol: '£',
    image: <Image alt="" width={20} height={20} src={GBFlag} />,
  },
  {
    name: 'Ethereum',
    abbreviation: 'ETH',
    symbol: 'ETH',
    image: (
      <Image
        alt=""
        width={20}
        height={20}
        src={'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'}
      />
    ),
  },
];
