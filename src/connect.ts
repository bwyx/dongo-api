import mongoose from 'mongoose';

type TDBInput = {
  dbString: string;
};

export default ({ dbString }: TDBInput) => {
  const connect = () => {
    mongoose
      .connect(dbString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        return console.info(`Successfully connected to database: ${dbString}`);
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
