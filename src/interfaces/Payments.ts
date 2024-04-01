export interface PaymentIntent {
    id: string;
    client_secret: string;
    amount: number;
    currency: string;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'failed';
    // Add more fields as needed
  }
  
  export interface PaymentError {
    code: string;
    message: string;
    // Add more fields as needed
  }
  