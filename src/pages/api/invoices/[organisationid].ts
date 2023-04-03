import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const { organisationid } = req.query;
    const _organisationId = new ObjectId(String(organisationid));

    const getAllOrganisationInvoices = await db
      .collection('invoices')
      .find({ organisationId: _organisationId })
      .toArray();

    res.status(200).json(getAllOrganisationInvoices);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
