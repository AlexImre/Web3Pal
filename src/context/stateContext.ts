import { v4 as uuidv4 } from 'uuid';
import { createContext } from 'react';

interface PersonalInformation {
    name: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    county: string;
    postalCode: string;
    country: string;
}

interface RecipientInformation {
    clientCompanyName: string;
    clientEmail: string;
    clientAddressLine1: string;
    clientAddressLine2: string;
    clientCity: string;
    clientCounty: string;
    clientPostalCode: string;
    clientCountry: string;
}

interface InvoiceInformation {
    invoiceNumber: string;
    date: string;
    dueDate: string;
}

interface currencyInformation {
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
    livePrice: number;
}

interface notesSection {
    notes: string;
}

interface tempInvoice {
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

export const initialState: {
    uuid: string;
    timestamp: any;
    personalInformation: PersonalInformation;
    recipientInformation: RecipientInformation;
    invoiceInformation: InvoiceInformation;
    currencyInformation: currencyInformation;
    servicesInformation: any;
    notesSection: notesSection;
    tempInvoice: tempInvoice;
    myInvoices: any;
    myServices: any;
    myAmounts: any;
    marketData: any;
} = {
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
        clientCompanyName: '',
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
        date: '', 
        dueDate: ''
    },

    currencyInformation: {
        invoiceLabelling: '',
        paymentMethod: 'Crypto',
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
        livePrice: 0,
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

    notesSection: {
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

export const StateContext = createContext(initialState);