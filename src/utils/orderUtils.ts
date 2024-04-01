import Product from '../models/Product';

export const calculateTotalAmount = async (items: { productId: string, quantity: number }[]): Promise<number> => {
  try {
    let totalAmount = 0;

    // Iterate over each item in the order
    for (const item of items) {
      // Retrieve the product price from the database
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      // Calculate the subtotal for the item (price * quantity)
      const subtotal = product.price * item.quantity;

      // Add the subtotal to the total amount
      totalAmount += subtotal;
    }

    return totalAmount;
  } catch (error) {
    console.error('Error calculating total amount:', error);
    throw error;
  }
};
