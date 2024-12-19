export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
  return newNumber;
};
