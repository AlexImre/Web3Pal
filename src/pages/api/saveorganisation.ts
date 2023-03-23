import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const organisation = req.body;
    console.log("organisation", organisation)
    const userDocument = await db.collection('users').findOne({ email: organisation.createdBy });
    console.log("userDocument", userDocument)
    const isUserPartOfAnOrganisation = userDocument.organisationId;
    console.log("isUserPartOfAnOrganisation", isUserPartOfAnOrganisation)



    if (!isUserPartOfAnOrganisation) {
      console.log("user is not part of an organisation, creating...")
      const saveOrganisationToCollection = await db.collection('organisations').insertOne(organisation);
      const addOrganisationIdToUser = await db.collection('users').updateOne({ email: organisation.createdBy }, { $set: { organisationId: saveOrganisationToCollection.insertedId } });
      res.status(201).json(saveOrganisationToCollection);
    } else {
      console.log("user is already part of an organisation, doing nothing!...")
      res.status(200).json("user is already part of an organisation");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};