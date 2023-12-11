import { Request, Response } from "express";
import { market  } from "./database";
import { Product } from "./interfaces";

const createProduct = (req: Request, res: Response): Response => {
  const { name, price, weight, calories, section } = req.body;

  if (section !== 'food' && section !== 'cleaning') {
    return res.status(400).json({ error: 'Section must be either "food" or "cleaning".' });
  }

  const maxId = market.reduce((max, product) => (product.id > max ? product.id : max), 0);

  const id = maxId + 1;

  const newProduct: Product = {
    id,
    name,
    price,
    weight,
    calories,
    section,
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};


const readProduct = (req: Request, res: Response): Response => {
  let totalPrice = 0;

  market.forEach((product) => {
    totalPrice += product.price;
  });

  const responseObj = {
    total: totalPrice,
    products: market,
  };

  return res.status(200).json(responseObj);
};

const readProductId = (req: Request, res: Response): Response => {
  const foundProduct = res.locals.foundProduct

  return res.status(200).json(foundProduct)
};

const updateProduct = (req: Request, res: Response): Response => {
  const { name, price, weight, calories } = req.body;

  const foundProduct = res.locals.foundProduct;
  const productIndex = market.indexOf(foundProduct);

  const updatedProduct: Product = {
    ...foundProduct,
    name: name || foundProduct.name,
    price: price !== undefined ? price : foundProduct.price,
    weight: weight || foundProduct.weight,
    calories: calories || foundProduct.calories,
  };

  market[productIndex] = updatedProduct;

  return res.status(200).json(updatedProduct);
};


const deleteProduct = (req: Request, res: Response): Response => {
  const foundProduct = res.locals.foundProduct

  const productIndex = market.indexOf(foundProduct);
  market.splice(productIndex, 1);

  return res.status(204).json()
};

export default { createProduct, readProduct, readProductId, deleteProduct, updateProduct };