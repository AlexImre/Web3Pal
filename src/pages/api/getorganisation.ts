import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    console.log("made it to fetching org")
    const client = await clientPromise;
    const db = client.db('web3pal');
    const { email } = req.query;

    console.log("email", email)

    const userData = await db.collection('users').findOne({ email: email });

    console.log("userData", userData)

    const organisationId = userData?.organisationId;
    console.log("organisationId", organisationId)

    if (organisationId) {
      const organisationData = await db.collection('organisations').findOne({ _id: organisationId });
      res.status(200).json(organisationData);
    } else {
      res.status(404).json("user is not part of an organisation");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};