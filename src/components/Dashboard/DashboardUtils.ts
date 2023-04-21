import { getServicesTotal } from '../InvoiceForm/ServicesUtils';

const convertCryptoToFiat = async (
  amount: number,
  crytoCurrency: string,
  fiatCurrency: string
) => {
  // const liveCryptoCurrencyPrice = marketData.find((coin) => coin.id === crytoCurrency).current_price;

  const liveCryptoCurrencyPrice = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crytoCurrency}&vs_currencies=${fiatCurrency}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const response = await liveCryptoCurrencyPrice.json();
  const priceInFiat = response.cryptoCurrency.fiatCurrency * amount;
  return priceInFiat;
};

export const getTotalBalance = async (myInvoices: any) => {
  const totalBalance = await Promise.all(
    myInvoices.map(async (invoice) => {
      const servicesTotal = getServicesTotal(invoice.servicesInformation);
      const amount = await convertCryptoToFiat(
        servicesTotal,
        invoice.paymentInformation.popularCurrency,
        invoice.paymentInformation.invoiceLabelling
      );
      return amount;
    })
  ).then((amounts) => amounts.reduce((acc, amount) => acc + amount, 0));
  return totalBalance;
};
