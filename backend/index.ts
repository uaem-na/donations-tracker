import express from 'express';
import dotenv from 'dotenv';
import debugRoutes from './routes/route.debug'; // Import your route

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a root route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Geocode API. Use /debug/geocode/:postalCode to get geocode data.');
  });
  
// Use the routes defined in route.debug.ts
app.use('/', debugRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
