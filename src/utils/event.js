export function getTotalPrice(offers, basePrice) {
  return offers.reduce((acc, offer) => acc + Number(offer.price), basePrice);
}
