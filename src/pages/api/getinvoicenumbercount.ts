import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    console.log("generating invoice number")

    // will need to change when moving to org structure    
    const { organisationId } = req.body;
    const query = { organisationId: new ObjectId(organisationId)}    
    const count = await db.collection('invoices').count(query);
    const invoiceNumber = count + 1;
    res.json(invoiceNumber);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
