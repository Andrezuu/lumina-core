import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env';
import router from './routes';
import { notFound, errorHandler } from './middlewares/errorHandler';

const app: Application = express();

// ── Security & Parsing ────────────────────────────────────────────────────────
app.use(helmet());
// app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use(ENV.API_PREFIX, router);

// ── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
