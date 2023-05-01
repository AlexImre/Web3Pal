import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    console.log('checking unique invoice number');

    const { user, invoiceNumber, invoiceId } = req.body;
    let isInvoiceNumberAvailable = false;

    // count the number of invoices with the same invoice number, if 0 is fine, if 1 but matches the invoiceId then is fine, otherwise not fine
    // What if want to have different clients but with same invoice number?
    const countQuery = {
      user: user,
      'invoiceInformation.invoiceNumber': invoiceNumber,
    };
    const invoiceNumberCount = await db
      .collection('invoices')
      .count(countQuery);

    if (invoiceNumberCount === 0) {
      isInvoiceNumberAvailable = true;
      res.json(isInvoiceNumberAvailable);
    } else if (invoiceNumberCount === 1) {
      const invoiceQuery = {
        user: user,
        'invoiceInformation.invoiceNumber': invoiceNumber,
        invoiceId: invoiceId,
      };
      const invoiceCount = await db.collection('invoices').count(invoiceQuery);
      if (invoiceCount === 1) {
        isInvoiceNumberAvailable = true;
        res.json(isInvoiceNumberAvailable);
      } else {
        res.json(isInvoiceNumberAvailable);
      }
    } else {
      res.json(isInvoiceNumberAvailable);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
