import { ethers } from 'ethers';
import { blockChainData } from '@/components/Wallets/blockchainData';

export function validateEmail(email: string) {
  if (email === '' || email === undefined) {
    return {
      error: true,
      message: 'Email cannot be blank',
    };
  }
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const doesPassRegexTest = emailRegex.test(email);
  if (!doesPassRegexTest) {
    return {
      error: true,
      message: 'Email must be a valid email address',
    };
  }
  return false;
}

export function validateName(name: string, property: string, label: string) {
  if (name === '' || name === undefined) {
    return {
      property,
      error: true,
      message: `${label || 'Field'} cannot be blank`,
    };
  }

  const nameRegex = /^[a-zA-Z0-9]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const doesPassRegexTest = nameRegex.test(name);
  if (!doesPassRegexTest) {
    return {
      property,
      error: true,
      message: 'Please only use characters [a - z, 0 - 9]',
    };
  }
  return false;
}

export function hasIssueDateError(issueDate: Date) {
  if (issueDate === undefined) {
    return {
      error: true,
      message: 'Issue date cannot be blank',
    };
  }
  const issueDateAsDate = new Date(issueDate);
  const isDate = issueDateAsDate instanceof Date;
  if (!isDate) {
    const error = {
      error: true,
      message: 'Issue date must be a valid date',
    };
    return error;
  }
  return false;
}

export function hasDueDateError(issueDate: Date, dueDate: Date) {
  if (dueDate === undefined) {
    return {
      error: true,
      message: 'Due date cannot be blank',
    };
  }
  const dueDateAsDate = new Date(dueDate);
  const isDate = dueDateAsDate instanceof Date;
  if (!isDate) {
    return {
      error: true,
      message: 'Due date must be a valid date',
    };
  }

  const isDueDateAfterIssueDate = dueDate > issueDate;
  if (!isDueDateAfterIssueDate) {
    return {
      error: true,
      message: 'Due date must be after issue date',
    };
  }
  return false;
}

export async function hasInvoiceNumberError(
  invoiceNumber: string,
  user: string,
  invoiceId: string
) {
  if (invoiceNumber === '' || invoiceNumber === undefined) {
    return {
      error: true,
      message: 'Invoice number cannot be blank',
    };
  }

  const req = await fetch('/api/invoicenumberuniquecheck', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user, invoiceNumber, invoiceId }),
  });

  const isInvoiceNumberAvailable = await req.json();

  if (!isInvoiceNumberAvailable) {
    return {
      error: true,
      message: 'Invoice number already exists',
    };
  } else {
    return false;
  }
}

export function validateInvoiceLabelling(invoiceLabel: string) {
  if (invoiceLabel === '' || invoiceLabel === undefined) {
    return {
      property: 'invoiceLabelling',
      error: true,
      message: 'Invoice label cannot be blank',
    };
  }

  const regex = /^[a-zA-Z0-9]+$/;
  const doesPassRegexTest = regex.test(invoiceLabel);
  if (!doesPassRegexTest) {
    return {
      property: 'invoiceLabelling',
      error: true,
      message: 'Invoice label must only use characters [a - z, 0 - 9]',
    };
  }
  return false;
}

export function validateOrganisationName(name: string) {
  if (name === '' || name === undefined) {
    return {
      property: 'name',
      error: true,
      message: 'Organisation name cannot be blank',
    };
  }

  const regex = /^[a-zA-Z0-9 ]+$/;
  const doesPassRegexTest = regex.test(name);
  if (!doesPassRegexTest) {
    return {
      property: 'name',
      error: true,
      message: 'Organisation name must only use characters [a - z, 0 - 9]',
    };
  }
  return false;
}

export function validateWalletName(walletName: string) {
  if (walletName === '' || walletName === undefined) {
    return {
      property: 'walletName',
      error: true,
      message: 'Wallet name cannot be blank',
    };
  }

  const regex = /^[a-zA-Z0-9 ]+$/;
  const doesPassRegexTest = regex.test(walletName);
  if (!doesPassRegexTest) {
    return {
      property: 'walletName',
      error: true,
      message: 'Wallet name must only use characters [a - z, 0 - 9]',
    };
  }
  return false;
}

export function validatePopularCurrency(popularCurrency: string) {
  if (popularCurrency === '' || popularCurrency === undefined) {
    return {
      property: 'popularCurrency',
      error: true,
      message: 'Currency cannot be blank',
    };
  }
  return false;
}

export function validateWalletAddress(walletAddress: string) {
  console.log('validate wallet address: ', walletAddress);
  if (walletAddress === '' || walletAddress === undefined) {
    return {
      property: 'walletAddress',
      error: true,
      message: 'Wallet address cannot be blank',
    };
  }

  const isValidWallet = ethers.utils.isAddress(walletAddress);
  if (!isValidWallet) {
    return {
      property: 'walletAddress',
      error: true,
      message: 'Wallet address is not valid',
    };
  }
  return false;
}

export function validateCustomCurrencySymbol(customCurrencySymbol: string) {
  if (customCurrencySymbol === '' || customCurrencySymbol === undefined) {
    return {
      property: 'customCurrencySymbol',
      error: true,
      message: 'Token symbol cannot be blank',
    };
  }
  return false;
}

export function validateCustomCurrencyAddress(customCurrencyAddress: string) {
  if (customCurrencyAddress === '' || customCurrencyAddress === undefined) {
    return {
      property: 'customCurrencyAddress',
      error: true,
      message: 'Token contract address cannot be blank',
    };
  }
  return false;
}

export function validateBlockchain(blockchain: any) {
  if (blockchain === '' || blockchain === undefined) {
    return {
      property: 'walletBlockchain',
      error: true,
      message: 'Blockchain cannot be blank',
    };
  }

  const { name } = blockchain;
  if (name === '' || name === undefined) {
    return {
      property: 'walletBlockchain',
      error: true,
      message: 'Blockchain cannot be blank',
    };
  }

  const isAllowedBlockchain = blockChainData.some(
    (blockchain) => blockchain.name === name
  );
  if (!isAllowedBlockchain) {
    return {
      property: 'walletBlockchain',
      error: true,
      message: 'Select a supported blockchain from the drop-down menu',
    };
  }
  return false;
}
