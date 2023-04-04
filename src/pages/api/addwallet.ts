import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const body = req.body;
    const { organisation_id, walletName, walletBlockchain, walletAddress, createdBy } = body;

    const newWallet = {
      walletName,
      walletAddress,
      walletBlockchain,
      createdBy,
      createdTimestamp: new Date(Date.now()),
    }
    const o_id = new ObjectId(organisation_id);
    const query = { _id: o_id, wallets: { $elemMatch:{walletAddress: walletAddress}} };
    const doesWalletExist = await db.collection('organisations').findOne(query);

    if (!doesWalletExist) {
      console.log("wallet does not exist, creating...")
      const saveWallet = await db.collection('organisations').updateOne({ _id: o_id }, {$push: { wallets: newWallet }});
      res.status(201).json(saveWallet);
    } else {
      console.log("wallet exists, doing nothing!...")
      res.status(400).json("wallet already exists")
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};