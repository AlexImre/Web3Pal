export const getServiceAmount = (service: any) => {
    if (!service.quantity || !service.price || service.quantity === 0 || service.price === 0) {
      return 0;
    }
    let convertDiscount = (service.discount / 100) * service.price;
    const result = 
      (service.quantity * service.price - convertDiscount) * (1 + service.tax / 100)
      return result;
  };

export const getServicesSubtotal = (service) => {
  return service?.reduce((accumulator, object) => {
    let convertDiscount = (object.discount / 100) * object.price;
    return accumulator + object.quantity * object.price - convertDiscount;
  }, 0);
};

export const getServicesTax = (service) => {
  return service?.reduce((accumulator, object) => {
    let convertDiscount = (object.discount / 100) * object.price;
    return (
      accumulator +
      (object.amount - (object.quantity * object.price - convertDiscount))
    );
  }, 0);
};

export const getServicesTotal = (service) => {
  return service?.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);
};