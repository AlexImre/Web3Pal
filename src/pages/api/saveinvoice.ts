import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';
import { InvoiceType } from '@/context/stateContext';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoice: InvoiceType = req.body;
    const query = { invoiceId: invoice.invoiceId };

    const doesInvoiceExist = await db.collection('invoices').findOne(query);
    if (doesInvoiceExist) {
      console.log('Invoice already exists, replacing...');
      console.log("replacement invoice: ", invoice)
      console.log("query", query)
      const replaceInvoice = await db
        .collection('invoices')
        .replaceOne(query, invoice);
      res.json(replaceInvoice);
    }

    if (!doesInvoiceExist) {
      console.log('Invoice does not exist, creating...');
      const saveInvoice = await db.collection('invoices').insertOne(invoice);
      res.json(saveInvoice);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
