import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const request = req.body;
    const user = request.user;
    const wallet = request.wallet;


    const query = { user: user, wallets: {walletAdress: wallet.walletAddress } };

    const doesWalletExist = await db.collection('users').find(query);

  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};