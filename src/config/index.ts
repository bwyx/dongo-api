export default {
  env: process.env.NODE_ENV as string,
  port: Number(process.env.PORT),
  mongoose: {
    url: process.env.MONGODB_URL as string,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
