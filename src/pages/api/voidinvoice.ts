import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoiceId = req.body;

    console.log("voiding one invoice")
    console.log("invoiceId: ", invoiceId)
    const voidInvoice = await db.collection('invoices').updateOne({ invoiceId }, { $set: { status: 'Void' }});
    res.status(200).json(voidInvoice);

  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};