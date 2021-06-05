import express from 'express';
import v1Routes from './routes/v1';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/v1', v1Routes);

export default app;
