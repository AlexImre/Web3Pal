import clientPromise from '../../../lib/mongodb'

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db('InvoicesDefi')

    const user = req.body
    console.log(user)
    console.log('saving user to DB')

    const post = await db.collection('Users').insertOne(user)
    res.json(post)
    console.log('saved user to DB')
  } catch (e) {
    console.error(e)
    throw new Error(e).message
  }
}
