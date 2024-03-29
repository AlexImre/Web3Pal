import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';
import { Request, Response } from 'express';

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db('web3pal');
    const invoice = req.body;
    const newInvoice = {
      ...invoice,
      organisationId: new ObjectId(invoice.organisationId),
    }
    const query = { invoiceId: invoice.invoiceId };

    const doesInvoiceExist = await db.collection('invoices').findOne(query);
    if (doesInvoiceExist) {
      const updateInvoice = await db
        .collection('invoices')
        .updateOne(query, {
          $set: {
            updatedTimestamp: Date.now(),
            invoiceInformation: invoice.invoiceInformation,
            personalInformation: invoice.personalInformation,
            recipientInformation: invoice.recipientInformation,
            paymentInformation: invoice.paymentInformation,
            servicesInformation: invoice.servicesInformation,
            notesInformation: invoice.notesInformation,
            formCompletion: invoice.formCompletion,
          }
        });
      res.json(updateInvoice);
    }

    if (!doesInvoiceExist) {
      const saveInvoice = await db.collection('invoices').insertOne(newInvoice);
      res.json(saveInvoice);
    }
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};