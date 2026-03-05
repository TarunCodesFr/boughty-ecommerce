import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route';
import productsRoute from './routes/product.route';
import cartRoute from './routes/cart.route';
import orderRoute from './routes/order.route';
import { authGuard } from './middlewares/auth.middleware';

export const app = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/', productsRoute);
app.use('/api/', cartRoute);
app.use('/api/', orderRoute);
