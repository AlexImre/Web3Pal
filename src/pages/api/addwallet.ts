import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const request = req.body;
    const user = request.user;
    const wallet = request.wallet;
    const query = { email: user, wallets: { $elemMatch: {address: wallet.address}} };
    const doesWalletExist = await db.collection('users').findOne(query);

    if (!doesWalletExist) {
      console.log("wallet does not exist, creating...")
      const saveWallet = await db.collection('users').updateOne({ email: user }, {$push: { wallets: wallet }});
      res.status(201).json(saveWallet);
    } else {
      console.log("wallet exists, doing nothing!...")
      res.status(200).json("wallet already exists")
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};