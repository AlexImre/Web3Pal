import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoice = req.body;
    const query = { invoiceID: invoice.uuid };

    const doesInvoiceExist = await db.collection('invoices').findOne(query);
    if (doesInvoiceExist) {
      const replaceInvoice = await db
        .collection('invoices')
        .replaceOne(query, invoice);
      res.json(replaceInvoice);
    }

    if (!doesInvoiceExist) {
      const saveInvoice = await db.collection('invoices').insertOne(invoice);
      res.json(saveInvoice);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
