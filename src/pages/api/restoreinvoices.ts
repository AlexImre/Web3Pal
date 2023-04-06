import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoiceIds = req.body;

    if (invoiceIds.length === 1) {
      console.log("restoring one invoice")
      const archiveInvoice = await db.collection('invoices').updateOne({ invoiceId: invoiceIds[0] }, { $set: { isArchived: false }});
      res.status(200).json(archiveInvoice);
    } 
    
    else if (invoiceIds.length > 1) {
      console.log("restoring many invoices")
      const archivedInvoices = invoiceIds.forEach(async (invoiceId) => {
        await db.collection('invoices').updateOne({ invoiceId: invoiceId }, { $set: { isArchived: false }});
      })
      res.status(200).json(archivedInvoices);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};