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
    quantity: number;
    price: number;
    discount: number;
    tax: number;
    amount: number;
}

export type MasterStateType = {
    invoice: InvoiceType;
    myInvoices: any;
    myServices: any;
    myAmounts: any;
    marketData: any;
}

export type InvoiceType = {
    _id?: string;
    invoiceId: string;
    createdTimestamp: Date;
    updatedTimestamp?: Date;
    user: string;
    status?: string;
    txHash?: string;
    paidTimestamp?: Date;
    invoiceInformation: InvoiceInformationType;
    personalInformation: PersonalInformationType;
    recipientInformation: RecipientInformationType;
    paymentInformation: PaymentInformationType;
    servicesInformation: Array<ServiceType>;
    notesInformation: NotesInformationType;
}

export const initialState: MasterStateType = {
    invoice: {
        _id: undefined,
        invoiceId: uuidv4(),
        createdTimestamp: new Date(Date.now()),
        updatedTimestamp: undefined,
        user: '',
        status: 'Example',
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
            issueDate: undefined, 
            dueDate: undefined
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
            description: 'Example Service',
            quantity: 1,
            price: 1,
            discount: 0,
            tax: 0,
            amount: 1
        }],
        notesInformation: {
            notes: ''
        },
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