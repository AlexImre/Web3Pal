export const fetchOrganisation = async ( email: string ) => {
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
}

export const fetchInvoice = async ( invoiceId: string) => {
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
}

export const fetchInvoices = async ( email: string ) => {
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices/${email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const invoicesData = await fetchData.json();
  return invoicesData;
}

export const fetchInvoiceNumber = async ( email: string ) => {
  const fetchInvoiceNumber = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getinvoicenumbercount`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  );
  const invoiceNumber = await fetchInvoiceNumber.json();
  return invoiceNumber;
}
