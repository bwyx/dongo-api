import mongoose from 'mongoose';
import app from './app';
import config from './config';

mongoose
  .connect(config.mongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.info('Connected to MongoDB');
    app.listen(config.port, () => {
      console.info(`Listening to port ${config.port}`);
    });
  });
