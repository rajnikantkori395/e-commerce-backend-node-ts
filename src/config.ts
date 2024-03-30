export default {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
    // Add other configurations as needed
  };
  