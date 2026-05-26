import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import professionalRoutes from './routes/professional.route.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [process.env.CLIENT_URL!, 'http://localhost:5000'], // Allow both production and development client URLs
  credentials: true,
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/professionals', professionalRoutes);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prolink API',
      version: '1.0.0',
      description: 'API documentation for Prolink'
    },
     servers: [
      {
        url: 'http://localhost:5000', // Change to your local port
        description: 'Development Server',
      },
    ],
  },
  components: {
    securitySchemes: {
      CookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken', // Matches your backend cookie name
      },
    },
  },
  apis: ['./src/routes/**/*.ts', './src/routes/**/*.js'],
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


connectDB().then( () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
