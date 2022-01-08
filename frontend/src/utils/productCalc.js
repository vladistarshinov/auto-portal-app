export const productQuantity = (products) => {
  return products.reduce((acc, item) => acc + +item.quantity, 0);
};

export const productQuantityPrice = (products) => {
  return products
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
};
