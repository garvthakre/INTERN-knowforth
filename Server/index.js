import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import personnelRoutes from './routes/PersonnelRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swaggerConfig.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/personnel', personnelRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});