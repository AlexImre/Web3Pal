import { getServicesTotal } from '@/components/InvoiceForm/ServicesUtils';

var SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  process.env.NEXT_PUBLIC_SIB_KEY;

export default async (req, res) => {
  const { invoice } = req.body;
  const { clientName, clientEmail } = invoice.recipientInformation;
  const { dueDate } = invoice.recipientInformation;
  const { invoiceLabelling, popularCurrency } = invoice.paymentInformation;
  const { servicesInformation } = invoice;
  const totalAmount = getServicesTotal(servicesInformation);

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: 'Hello from Web3Pal!',
      sender: { email: 'Web3pal@gmail.com', name: 'Web3Pal' },
      replyTo: { email: 'api@sendinblue.com', name: 'Sendinblue' },
      to: [{ name: 'Alex Imre', email: 'alexandre.imre@gmail.com' }],
      templateId: 2,
      params: {
        shareLink:
          'http://localhost:3000/invoices/69cab5eb-ed4b-4e02-af94-6d029dea9969',
        clientEmail,
        clientName,
        dueDate,
        invoiceLabelling,
        popularCurrency,
        totalAmount,
      },
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
};
