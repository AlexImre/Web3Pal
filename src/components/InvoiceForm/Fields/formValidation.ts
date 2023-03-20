export function validateEmail(email: string) {
  if (email === '' || email === undefined) {
    return {
      error: true,
      message: 'Email cannot be blank',
    }
  }
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const doesPassRegexTest = emailRegex.test(email);
  if (!doesPassRegexTest) {
    return {
      error: true,
      message: 'Email must be a valid email address',
    }
  }
  return false; 
}

export function validateName(name: string) {
  if (name === '' || name === undefined) {
    return {
      error: true,
      message: 'Name cannot be blank',
    }
  }
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const doesPassRegexTest = nameRegex.test(name);
  if (!doesPassRegexTest) {
    return {
      error: true,
      message: 'Please only use characters [a - z].',
    }
  }
  return false; 
}

export function hasIssueDateError(issueDate: string) {
  if (issueDate === '' || issueDate === undefined) {
    return {
      error: true,
      message: 'Issue date cannot be blank',
    }
  }
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
  if (dueDate === '' || dueDate === undefined) {
    return {
      error: true,
      message: 'Due date cannot be blank',
    }
  }
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
  if (invoiceNumber === '' || invoiceNumber === undefined) {
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

export function validateInvoiceLabelling(invoiceLabel: string) {
  if (invoiceLabel === '' || invoiceLabel === undefined) {
    return {
      error: true,
      message: 'Invoice label cannot be blank',
    }
  }

  const regex = /^[a-zA-Z0-9]+$/;
  const doesPassRegexTest = regex.test(invoiceLabel);
  if (!doesPassRegexTest) {
    return {
      error: true,
      message: 'Invoice label must only use characters [a - z, 0 - 9]',
    }
  }
  return false;
}
