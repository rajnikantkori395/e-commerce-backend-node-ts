// controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/Product";
import { IProduct } from "../interfaces/Product";

// Create a new product
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price } = req.body;
    const product: IProduct = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const { name, description, price } = req.body;
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product: IProduct | null = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Searching products by name
export const searchProductsByName = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the search query parameter from the request
    const { name } = req.query;
    console.log(name);
    

    // Perform the search query to find products by name
    const products: IProduct[] = await Product.find({ name: { $regex: new RegExp(name as string, 'i') } });

    // Return the matching products as a response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//search on more than one fields 
export const searchProductsByManyFields = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the search query parameter from the request
    const { query } = req.query;

    // Define regular expression pattern to search on multiple fields
    const regex = new RegExp(query as string, 'i');

    // Perform the search query to find products by name or any other relevant fields
    const products: IProduct[] = await Product.find({
      $or: [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        // Add more fields as needed for searching
      ]
    });

    // Return the matching products as a response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
