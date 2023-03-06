import clientPromise from '../../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    console.log("made it to fetching invoiceid")
    console.log("req.query", req.query)
    const client = await clientPromise;
    const db = client.db('web3pal');
    const { invoiceid } = req.query;

    console.log('fetching invoiceId', invoiceid);
    const getInvoice = await db
      .collection('invoices')
      .find({ invoiceId: invoiceid })
      .toArray();

    res.status(200).json(getInvoice);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
