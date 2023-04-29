import { v4 as uuidv4 } from 'uuid';
import { createContext } from 'react';
export interface PersonalInformationType {
  name: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  county: string;
  postalCode: string;
  country: string;
}

export interface RecipientInformationType {
  clientName: string;
  clientEmail: string;
  clientAddressLine1: string;
  clientAddressLine2: string;
  clientCity: string;
  clientCounty: string;
  clientPostalCode: string;
  clientCountry: string;
}

export interface InvoiceInformationType {
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
}

export interface PaymentInformationType {
  invoiceLabelling: string;
  paymentMethod: string;
  popularPlatform: string;
  popularCurrency: string;
  customCurrencyName: string;
  customCurrencySymbol: string;
  customCurrencyPlatform: string;
  customCurrencyAddress: string;
  walletName: string;
  walletAddress: string;
  bankAccountName: string;
  bankAccountDetails: string;
  marketPrice: number;
}

export interface NotesInformationType {
  notes: string;
}

export type ServiceType = {
  uuid: string;
  serviceId: Number;
  description: string;
  quantity: string;
  price: string;
  discount: string;
  tax: string;
  amount: string;
};

export type FormCompletionType = {
  personalInformation: boolean;
  invoiceInformation: boolean;
  recipientInformation: boolean;
  paymentInformation: boolean;
  servicesInformation: boolean;
};

export type MasterStateType = {
  invoice: InvoiceType;
  validation: {
    invoiceNumber: boolean;
    dueDate: boolean;
    recipientInformation: boolean;
    wallet: boolean;
  };
  myInvoices: Array<InvoiceType>;
  myServices: any;
  myAmounts: any;
  marketData: any;
  organisation: OrganisationType;
  autoGeneratedInvoiceNumber: string;
  session: any;
};

export type InvoiceType = {
  _id?: string;
  invoiceId: string;
  organisationId: string;
  createdTimestamp: Date;
  updatedTimestamp?: Date;
  user: string;
  status?: string;
  isDraft: boolean;
  isPublished?: boolean;
  isArchived?: boolean;
  txHash?: string;
  paidTimestamp?: Date;
  invoiceInformation: InvoiceInformationType;
  personalInformation: PersonalInformationType;
  recipientInformation: RecipientInformationType;
  paymentInformation: PaymentInformationType;
  servicesInformation: Array<ServiceType>;
  notesInformation: NotesInformationType;
  formCompletion: FormCompletionType;
};

export type OrganisationType = {
  _id?: string;
  organisationName: string;
  organisationEmail: string;
  organisationAddressLine1?: string;
  organisationAddressLine2?: string;
  organisationCity?: string;
  organisationCounty?: string;
  organisationPostalCode?: string;
  country?: string;
  createdBy: string;
  updatedBy: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
  members: Array<string>;
  admins: Array<string>;
  wallets: Array<WalletType>;
  clients: Array<ClientType>;
};

export type WalletType = {
  organisation_id: string;
  walletName: string;
  walletBlockchain: any;
  walletAddress: string;
  walletChainId?: string;
  createdBy: string;
  createdTimestamp: Date;
  updatedBy?: string;
  updatedTimestamp?: Date;
};

export type ClientType = {
  organisation_id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientAddressLine1?: string;
  clientAddressLine2?: string;
  clientCity?: string;
  clientCounty?: string;
  clientPostalCode?: string;
  clientCountry?: string;
  createdBy: string;
  createdTimestamp: Date;
  updatedBy?: string;
  updatedTimestamp?: Date;
};

const defaultIssueDate = new Date(Date.now());
const defaultDueDate = new Date(
  defaultIssueDate.valueOf() + 31 * 24 * 60 * 60 * 1000
);

export const initialState: MasterStateType = {
  invoice: {
    _id: undefined,
    invoiceId: uuidv4(),
    organisationId: undefined,
    createdTimestamp: new Date(Date.now()),
    updatedTimestamp: undefined,
    user: '',
    status: 'Example',
    isDraft: false,
    isPublished: false,
    isArchived: false,
    txHash: '',
    paidTimestamp: undefined,
    personalInformation: {
      name: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      county: '',
      postalCode: '',
      country: '',
    },
    recipientInformation: {
      clientName: '',
      clientEmail: '',
      clientAddressLine1: '',
      clientAddressLine2: '',
      clientCity: '',
      clientCounty: '',
      clientPostalCode: '',
      clientCountry: '',
    },
    invoiceInformation: {
      invoiceNumber: '',
      issueDate: defaultIssueDate,
      dueDate: defaultDueDate,
    },
    paymentInformation: {
      invoiceLabelling: 'USD',
      paymentMethod: 'crypto',
      popularPlatform: '',
      popularCurrency: 'ETH',
      customCurrencyName: '',
      customCurrencySymbol: '',
      customCurrencyPlatform: '',
      customCurrencyAddress: '',
      walletName: '',
      walletAddress: '',
      bankAccountName: '',
      bankAccountDetails: '',
      marketPrice: 0,
    },
    servicesInformation: [
      {
        uuid: uuidv4(),
        serviceId: 0,
        description: 'Example Service',
        quantity: '1',
        price: '100',
        discount: '',
        tax: '',
        amount: '100',
      },
    ],
    notesInformation: {
      notes: '',
    },
    formCompletion: {
      personalInformation: false,
      invoiceInformation: false,
      recipientInformation: false,
      paymentInformation: false,
      servicesInformation: false,
    },
  },
  validation: {
    invoiceNumber: false,
    dueDate: false,
    recipientInformation: false,
    wallet: false,
  },
  myInvoices: [],
  myServices: [],
  myAmounts: [],
  marketData: [],
  organisation: {
    _id: undefined,
    organisationName: '',
    organisationEmail: '',
    organisationAddressLine1: '',
    organisationAddressLine2: '',
    organisationCity: '',
    organisationCounty: '',
    organisationPostalCode: '',
    country: '',
    createdBy: '',
    updatedBy: '',
    createdTimestamp: new Date(Date.now()),
    updatedTimestamp: new Date(Date.now()),
    members: [],
    admins: [],
    wallets: [],
    clients: [],
  },
  autoGeneratedInvoiceNumber: '0',
  session: {},
};

export const initialTempServicesInfo: Array<ServiceType> = [
  {
    uuid: uuidv4(),
    serviceId: 0,
    description: 'Example Service',
    quantity: '1',
    price: '100',
    discount: '',
    tax: '',
    amount: '100',
  },
];

export type MasterStateContextType = {
  masterState: MasterStateType;
  setMasterState: React.Dispatch<React.SetStateAction<MasterStateType>>;
};

export const defaultState: MasterStateContextType = {
  masterState: initialState,
  setMasterState: () => {},
};
export const StateContext = createContext<MasterStateContextType | null>(
  defaultState
);

export type TempServicesInfoContextType = {
  tempServicesInfo: Array<ServiceType>;
  setTempServicesInfo: React.Dispatch<React.SetStateAction<Array<ServiceType>>>;
};

export const defaultTempServicesInfo: TempServicesInfoContextType = {
  tempServicesInfo: initialTempServicesInfo,
  setTempServicesInfo: () => {},
};

export const TempServicesInfoContext =
  createContext<TempServicesInfoContextType | null>(defaultTempServicesInfo);
