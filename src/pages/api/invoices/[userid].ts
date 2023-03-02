import clientPromise from '../../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const { userid } = req.query;

    console.log('userid', userid);
    const getAllUserInvoices = await db
      .collection('invoices')
      .find({ user: userid })
      .toArray();

    res.status(200).json(getAllUserInvoices);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
