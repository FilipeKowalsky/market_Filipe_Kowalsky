interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  calories: number;
  expirationDate: Date;
}

export { Product };