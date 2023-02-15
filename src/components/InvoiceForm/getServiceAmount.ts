export const getServiceAmount = (service: any) => {
    if (!service.quantity || !service.price || service.quantity === 0 || service.price === 0) {
      return 0;
    }
    let convertDiscount = (service.discount / 100) * service.price;
    const result = 
      (service.quantity * service.price - convertDiscount) * (1 + service.tax / 100)
      console.log(typeof result)
      return result;

  };