import fetch from 'node-fetch';

export const getMarketData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=ethereum-ecosystem&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    requestOptions
  );
  const data = await response.json();
  return data;
};
