import { getServicesTotal } from '../InvoiceForm/ServicesUtils';

const convertCryptoToFiat = async (
  amount: number,
  cryptoCurrency: string,
  fiatCurrency: string
) => {
  // const liveCryptoCurrencyPrice = marketData.find((coin) => coin.id === crytoCurrency).current_price;
  console.log('amount', amount);
  console.log('crytoCurrency', cryptoCurrency);
  console.log('fiatCurrency', fiatCurrency);

  try {
    const liveCryptoCurrencyPrice = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoCurrency}&vs_currencies=usd`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const response = await liveCryptoCurrencyPrice.json();
    console.log('response', response);

    const priceInFiat = response[cryptoCurrency.toLowerCase()].usd * amount;

    console.log('priceInFiat', priceInFiat);
    return priceInFiat;
  } catch (error) {
    console.log('error', error);
    return 0;
  }
};

export const getTotalBalance = async (myInvoices: any) => {
  console.log('myInvoices', myInvoices);
  const totalBalance = await Promise.all(
    myInvoices.map(async (invoice) => {
      const servicesTotal = getServicesTotal(invoice.servicesInformation);

      if (invoice.paymentInformation.invoiceLabelling === 'USD') {
        return servicesTotal;
      }

      console.log('servicesTotal', servicesTotal);

      const amount = await convertCryptoToFiat(
        servicesTotal,
        invoice.paymentInformation.popularPlatform,
        invoice.paymentInformation.invoiceLabelling
      );
      console.log('amount', amount);

      return amount;
    })
  ).then((amounts) =>
    amounts.reduce((acc, amount) => Number(acc) + Number(amount), 0)
  );
  console.log('totalBalance', totalBalance);
  return await totalBalance;
};
