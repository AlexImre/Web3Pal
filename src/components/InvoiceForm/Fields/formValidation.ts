export function validateEmail(email: string) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function validateName(name: string) {
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return nameRegex.test(name);
}

export function hasIssueDateError(issueDate: string) {
  const issueDateAsDate = new Date(issueDate);
  const isDate = issueDateAsDate instanceof Date;
  if (!isDate) {
    const error = {
      error: true,
      message: 'Issue date must be a valid date',
    }
    return error;
  }
  return false;
}

export function hasDueDateError(issueDate: string, dueDate: string) {
  const dueDateAsDate = new Date(dueDate);
  const isDate = dueDateAsDate instanceof Date;
  if (!isDate) {
    return {
      error: true,
      message: 'Due date must be a valid date',
    }
  }

  const isDueDateAfterIssueDate = dueDate > issueDate;
  if (!isDueDateAfterIssueDate) {
    return {
      error: true,
      message: 'Due date must be after issue date',
    }
  }
  return false;
}

export async function hasInvoiceNumberError(invoiceNumber: string, user: string, invoiceId: string) {
  if (invoiceNumber === '' || undefined) {
    return {
      error: true,
      message: 'Invoice number cannot be blank',
    }
  }
  
  const req = await fetch("/api/invoicenumberuniquecheck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, invoiceNumber, invoiceId }),
  })

  const isInvoiceNumberAvailable = await req.json();

  if (!isInvoiceNumberAvailable) {
    return {
      error: true,
      message: 'Invoice number already exists',
    }
  } else {
    return false;
  }
}
