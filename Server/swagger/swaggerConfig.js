import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CRM API',
    version: '1.0.0',
    description: 'API documentation for the CRM backend',
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
