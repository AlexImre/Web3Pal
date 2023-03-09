import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoice = req.body;
    const { _id, status, txHash, paidTimestamp } = invoice;
    const o_id = new ObjectId(_id);

    console.log("updating invoice with the following data: ", _id, status, txHash, paidTimestamp)

    const update = await db.collection('invoices').updateOne({ _id: o_id }, { $set: { status: "Paid", txHash: txHash, paidTimestamp: paidTimestamp} })

    res.json(update);

  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
