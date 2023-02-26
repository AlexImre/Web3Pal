import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');

    const user = req.body;
    console.log(user);
    console.log('saving invoice to DB');

    const post = await db.collection('invoices').insertOne(user);
    res.json(post);
    console.log('saved invoice to DB');
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
