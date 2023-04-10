import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoiceId = req.body;
    const query = { invoiceId };
    const doesInvoiceExist = await db.collection('invoices').findOne(query);

    if (!doesInvoiceExist) {
      res.status(404).send("Invoice does not exist");
    }

    const updateInvoice = await db
      .collection('invoices')
      .updateOne(query, {
        $set: {
          updatedTimestamp: Date.now(),
          status: 'Unpaid'
        }
      });

    res.status(200).send("Invoice published");
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};

