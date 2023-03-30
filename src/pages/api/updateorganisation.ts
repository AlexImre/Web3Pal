import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const organisation = req.body;
    const {
      _id,
      organisationName, 
      organisationEmail, 
      organisationAddressLine1, 
      organisationAddressLine2, 
      organisationCity, 
      organisationCounty, 
      organisationPostalCode, 
      country, 
      updatedBy, 
      updatedTimestamp } = organisation;
    
    const o_id = new ObjectId(_id);
    const findOrg = await db.collection('organisations').findOne({ _id: o_id });
    const setParameters = { 
      $set: { 
        organisationName, 
        organisationEmail, 
        organisationAddressLine1, 
        organisationAddressLine2, 
        organisationCity, 
        organisationCounty, 
        organisationPostalCode, 
        country, 
        updatedBy, 
        updatedTimestamp
      }};

    if (findOrg) {
      console.log("updating org...")
      const updateOrganisation = await db.collection('organisations').updateOne({ _id: o_id }, setParameters);
      res.status(201).json(updateOrganisation);
    } else {
      console.log("didn't find org, doing nothing!...")
      res.status(200).json("didn't find org");
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};