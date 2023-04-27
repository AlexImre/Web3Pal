import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const newClient = req.body;
    const organisation_id = req.body.organisation_id;
    const o_id = new ObjectId(organisation_id);
    const query = {
      _id: o_id,
      clients: { $elemMatch: { clientEmail: req.body.clientEmail } },
    };
    const doesClientExist = await db.collection('organisations').findOne(query);

    if (!doesClientExist) {
      const saveClient = await db
        .collection('organisations')
        .updateOne({ _id: o_id }, { $push: { clients: newClient } });

      res.status(201).json(saveClient);
    } else {
      res.status(400).json('Client already exists');
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
