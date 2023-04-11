import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoiceIds = req.body;

    console.log("invoiceIds", invoiceIds)

    if (invoiceIds.length === 1) {
      console.log("deleting one invoice")
      const query = { invoiceId: invoiceIds[0] };
      const deleteInvoice = await db.collection('invoices').deleteOne(query);
      res.json(deleteInvoice);
    } 
    
    else if (invoiceIds.length > 1) {
      console.log("deleting many invoices")
      const deleteInvoices = invoiceIds.map( async (invoiceId) => {
        const query = { invoiceId: invoiceId }
        await db.collection('invoices').deleteOne(query);
      })
      res.json(deleteInvoices);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
