export const fetchOrganisation = async (email: string) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getorganisation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    const orgData = await fetchData.json();
    return orgData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchInvoice = async (invoiceId: string) => {
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/view/${invoiceId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const invoiceData = await fetchData.json();
  return invoiceData;
};

// does this not need to be encoded?!
export const fetchInvoices = async (organisationId: string) => {
  try {
    const fetchData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices/${encodeURIComponent(
        organisationId
      )}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const invoicesData = await fetchData.json();
    return invoicesData;
  } catch (error) {
    console.error(error);
  }
};

export const fetchInvoiceNumber = async (organisationId: string) => {
  const fetchInvoiceNumber = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getinvoicenumbercount`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organisationId }),
    }
  );
  const invoiceNumber = await fetchInvoiceNumber.json();
  return invoiceNumber;
};
