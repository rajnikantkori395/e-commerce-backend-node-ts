// routes/products.ts
import { Router, Request, Response } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  searchProductsByName
} from "../controllers/productController";

const router: Router = Router();

// Search products by name (GET /api/products/search?name=<searchQuery>)
router.get("/search", authenticateToken, searchProductsByName);

// Create a new product (POST /api/products)
router.post("/", authenticateToken, createProduct);

// Update an existing product (PUT /api/products/:productId)
router.put("/:productId", authenticateToken, updateProduct);

// Delete a product (DELETE /api/products/:productId)
router.delete("/:productId", authenticateToken, deleteProduct);

// Get a product by ID (GET /api/products/:productId)
router.get("/:productId", authenticateToken, getProductById);

// Get all products (GET /api/products)
router.get("/", authenticateToken, getAllProducts);

export default router;
