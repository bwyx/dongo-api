import express, { Application, urlencoded, json } from 'express';
import routes from './routes';
import connect from './connect';
import { db, port } from './config';

const app: Application = express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(routes)
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

connect(db);
