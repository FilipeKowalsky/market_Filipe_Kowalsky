import { Request, Response, NextFunction } from "express";
import { market } from "./database";

const CheckName =  (req : Request, res: Response, next: NextFunction) =>{
  const name = req.body.name;
  const productExists = market.some((product) => product.name === name);

  if (productExists) {
    return res.status(409).json({ error: "Product already registered.", message: "Product already registered." });
  }

  return next()
}

const CheckId = (req : Request, res: Response, next: NextFunction) =>{
  const productId = Number(req.params.id);
  const foundProduct = market.find((product) => product.id === productId);

  if (!foundProduct) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.locals.foundProduct = foundProduct;

  return next();
}

export { CheckName, CheckId }