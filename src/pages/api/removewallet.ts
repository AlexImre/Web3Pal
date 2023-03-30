import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const {organisation_id, walletAddress} = req.body;

    console.log("body: ", req.body)


    const o_id = new ObjectId(organisation_id);
    const query = { _id: o_id, wallets: { $elemMatch:{walletAddress: walletAddress}} };
    const doesWalletExist = await db.collection('organisations').findOne(query);

    if (doesWalletExist) {
      console.log("wallet exists, deleting...")
      const removeWallet = await db.collection('organisations').updateOne({ _id: o_id }, {$pull: { wallets: { walletAddress: walletAddress } }});
      res.status(200).json(removeWallet);
    } else {
      console.log("wallet did not exist, doing nothing!...")
      res.status(400).json("wallet did not exist")
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};