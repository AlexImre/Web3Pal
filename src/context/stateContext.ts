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
    issueDate: string;
    dueDate: string;
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

export interface TempInvoiceType {
    userId: string;
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    county: string;
    postalCode: string;
    country: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    clientEmail: string;
    clientCompanyName: string;
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
    notes: string;
}

export type ServiceType = {
    uuid: string;
    serviceId: Number;
    description: string;
    quantity: number;
    price: number;
    discount: number;
    tax: number;
    amount: number;
}

export type MasterStateType = {
    uuid: string;
    timestamp: any;
    personalInformation: PersonalInformationType;
    recipientInformation: RecipientInformationType;
    invoiceInformation: InvoiceInformationType;
    paymentInformation: PaymentInformationType;
    servicesInformation: Array<ServiceType>;
    notesInformation: NotesInformationType;
    tempInvoice: TempInvoiceType;
    myInvoices: any;
    myServices: any;
    myAmounts: any;
    marketData: any;
}

export type AddInvoiceType = {
    invoiceId: string;
    user: string;
    invoiceInformation: InvoiceInformationType;
    personalInformation: PersonalInformationType;
    recipientInformation: RecipientInformationType;
    paymentInformation: PaymentInformationType;
    servicesInformation: Array<ServiceType>;
    notesInformation: NotesInformationType;
}

export const initialState: MasterStateType = {
    uuid: uuidv4(),

    timestamp: Date.now(),
    
    personalInformation: {
        name: '',  
        email: '', 
        addressLine1: '', 
        addressLine2: '', 
        city: '', 
        county: '', 
        postalCode: '', 
        country: ''
    },

    recipientInformation: {
        clientName: '',
        clientEmail: '',
        clientAddressLine1: '', 
        clientAddressLine2: '', 
        clientCity: '', 
        clientCounty: '', 
        clientPostalCode: '', 
        clientCountry: ''
    },

    invoiceInformation: {
        invoiceNumber: '', 
        issueDate: '', 
        dueDate: ''
    },

    paymentInformation: {
        invoiceLabelling: '',
        paymentMethod: 'crypto',
        popularPlatform: '',
        popularCurrency: '',
        customCurrencyName: '',
        customCurrencySymbol: '',
        customCurrencyPlatform: '',
        customCurrencyAddress: '',
        walletName: '',
        walletAddress: '',
        bankAccountName: '',
        bankAccountDetails: '',
        marketPrice:0,
    },

    servicesInformation: [{
        uuid: uuidv4(),
        serviceId: 0,
        description: '',
        quantity: 0,
        price: 0,
        discount: 0,
        tax: 0,
        amount: 0
    }],

    notesInformation: {
        notes: ''
    },

    tempInvoice: {
        userId: '',
        uuid: '',
        firstName: '',
        lastName: '', 
        email: '',
        companyName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        county: '',
        postalCode: '',
        country: '',
        invoiceNumber: '',
        date:  '',
        dueDate: '',
        clientEmail: '',
        clientCompanyName: '',
        invoiceLabelling: '',
        paymentMethod: '',
        popularPlatform: '',
        popularCurrency: '',
        customCurrencyName: '',
        customCurrencySymbol: '',
        customCurrencyPlatform: '',
        customCurrencyAddress: '',
        walletName: '',
        walletAddress: '',
        bankAccountName: '',
        bankAccountDetails: '',
        notes: '', 
    },

    myInvoices: [],

    myServices: [],

    myAmounts: [],

    marketData: [],
}

type MasterStateContextType = {
    masterState: MasterStateType
    setMasterState: React.Dispatch<React.SetStateAction<MasterStateType>>;
}

export const defaultState: MasterStateContextType = {
    masterState: initialState,
    setMasterState: () => { }
}

export const StateContext = createContext<MasterStateContextType | null>(defaultState);