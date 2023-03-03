import { v4 as uuidv4 } from 'uuid';

export const addDummyData = async () => {
    dummyInvoiceData.invoiceId = uuidv4();
    dummyInvoiceData.personalInformation.email = `testUser${Math.floor(
      Math.random() * 100
    )}@hotmail.com`;
    dummyInvoiceData.personalInformation.name = `Test User ${Math.floor(
      Math.random() * 100
    )}`;
    const addedInvoice = await fetch('/api/saveinvoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dummyInvoiceData),
    });
  };

export const dummyInvoiceData = {
    invoiceId: uuidv4(),
    user: `alexandre.imre@gmail.com`,
    personalInformation: {
        name: 'John Doe',
        email: `testUser${Math.floor(Math.random() * 20)}@hotmail.com`,
        addressLine1: '1234 Main Street',
        addressLine2: 'Apt 1',
        city: 'New York',
        county: 'New York',
        postalCode: '10001',
        country: 'United States'
    },
    recipientInformation: {
        clientName: 'Jane Doe',
        clientEmail: `testUser${Math.floor(Math.random() * 20)}@hotmail.com`,
        clientAddressLine1: '1234 Main Street',
        clientAddressLine2: 'Apt 1',
        clientCity: 'New York',
        clientCounty: 'New York',
        clientPostalCode: '10001',
        clientCountry: 'United States'
    },
    invoiceInformation: {
        invoiceNumber: '1234',
        issueDate: '2021-01-01',
        dueDate: '2021-01-31'
    },
    paymentInformation: {
        invoiceLabelling: 'USD',
        paymentMethod: 'crypto',
        popularPlatform: 'Bitcoin',
        popularCurrency: 'BTC',
        walletName: 'Coinbase',
        walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    },
    servicesInformation: [{
        uuid: uuidv4(),
        serviceId: 0,
        description: 'Service 1',
        quantity: 1,
        price: 100,
        discount: 0,
        tax: 0,
        amount: 100
    },
    {
        uuid: uuidv4(),
        serviceId: 1,
        description: 'Service 2',
        quantity: 1,
        price: 200,
        discount: 0,
        tax: 10,
        amount: 210}  ],
    notesInformation: {
        notes: 'This is a test invoice'
    }
}