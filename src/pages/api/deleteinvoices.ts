import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';
import { AddInvoiceType } from '@/context/stateContext';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoiceIds = req.body;

    if (invoiceIds.length === 1) {
      console.log("deleting one invoice")
      const query = { invoiceID: invoiceIds[0].invoiceId };
      const deleteInvoice = await db.collection('invoices').deleteOne(query);
      res.json(deleteInvoice);
    } 
    
    else if (invoiceIds.length > 1) {
      console.log("deleting many invoices")
      invoiceIds.forEach( async (invoice) => {
        const query = { invoiceID: invoice.invoiceId }
        const deleteInvoices = await db.collection('invoices').deleteOne(query);
        res.json(deleteInvoices);
      })
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
