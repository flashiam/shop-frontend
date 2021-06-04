const items = [
  {
    id: 1,
    name: "chicken",
    quantity: 1,
    price: 340,
  },
  {
    id: 2,
    name: "fish",
    quantity: 2,
    price: 590,
  },
  {
    id: 3,
    name: "mutton",
    quantity: 2,
    price: 999,
  },
];

const totalPrice = items.reduce(
  (prevItem, curItem) => prevItem + curItem.price,
  0
);

totalPrice;
