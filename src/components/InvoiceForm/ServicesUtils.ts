import BigNumber from 'bignumber.js';

export const getServiceAmount = (service: any) => {
  if (
    !service.quantity ||
    !service.price ||
    service.quantity === '0' ||
    service.price === '0'
  ) {
    return 0;
  }

  const quantity = new BigNumber(service.quantity);
  const price = new BigNumber(service.price);

  let discount;
  if (service.discount) {
    discount = new BigNumber(service.discount);
  } else {
    discount = new BigNumber(0);
  }

  let tax;
  if (service.tax) {
    tax = new BigNumber(service.tax);
  } else {
    tax = new BigNumber(0);
  }

  let convertDiscountToAmount = discount.dividedBy(100).multipliedBy(price);
  const priceAfterDiscount = price.minus(convertDiscountToAmount);
  const totalAfterDiscount = quantity.multipliedBy(priceAfterDiscount);

  let convertTaxToAmount = tax.dividedBy(100).multipliedBy(totalAfterDiscount);
  const totalAmount = totalAfterDiscount.plus(convertTaxToAmount);
  return totalAmount;
};

export const getTaxAmount = (service: any) => {
  if (
    !service.quantity ||
    !service.price ||
    service.quantity === '0' ||
    service.price === '0'
  ) {
    return 0;
  }

  const quantity = new BigNumber(service.quantity);
  const price = new BigNumber(service.price);

  let discount;
  if (service.discount) {
    discount = new BigNumber(service.discount);
  } else {
    discount = new BigNumber(0);
  }

  let tax;
  if (service.tax) {
    tax = new BigNumber(service.tax);
  } else {
    tax = new BigNumber(0);
  }

  let convertDiscountToAmount = discount.dividedBy(100).multipliedBy(price);
  const priceAfterDiscount = price.minus(convertDiscountToAmount);
  const totalAfterDiscount = quantity.multipliedBy(priceAfterDiscount);

  let convertTaxToAmount = tax.dividedBy(100).multipliedBy(totalAfterDiscount);
  return convertTaxToAmount;
};

export const getServicesSubtotal = (service: any) => {
  return service?.reduce((accumulator, object) => {
    const accum = new BigNumber(accumulator);
    const serviceAmount = new BigNumber(getServiceAmount(object));
    const taxAmount = new BigNumber(getTaxAmount(object));
    const totalAmount = serviceAmount.minus(taxAmount);
    const total = accum.plus(totalAmount);
    return total.toFixed(2);
  }, 0);
};

export const getServicesTax = (service: any) => {
  return service?.reduce((accumulator, object) => {
    const accum = new BigNumber(accumulator);
    const taxAmount = new BigNumber(getTaxAmount(object));
    const total = accum.plus(taxAmount);
    return total.toFixed(2);
  }, 0);
};

export const getServicesTotal = (service: any) => {
  return service?.reduce((accumulator, object) => {
    const accum = new BigNumber(accumulator);
    const serviceAmount = new BigNumber(getServiceAmount(object));
    const total = accum.plus(serviceAmount);
    return total.toFixed(2);
  }, 0);
};
