import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import personnelRoutes from './routes/personnelRoutes.js';
import achievementRoutes from './routes/achievementsRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import { article } from 'framer-motion/client'
import messageRoutes from './routes/messageRoutes.js';
import connectionRoutes from './routes/connectionRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import masterRoutes from './routes/masterRoutes.js';
import buisnessRoutes from './routes/businessRoutes.js';
dotenv.config();
const app = express();

// Swagger configuration
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API',
      version: '1.0.0',
      description: 'API docs for CRM backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/*.js'],  
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/achievement', achievementRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/article',articleRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/connection',connectionRoutes);
app.use('/api/search',searchRoutes);
app.use('/api/sub',subscriptionRoutes);
app.use('/api/feedback',feedbackRoutes);
app.use('/api/master',masterRoutes);
app.use('/api/business',buisnessRoutes);
// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'CRM Backend API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Swagger docs: http://localhost:${PORT}/api-docs`);
});
