export const db = {
  conn: process.env['DB_CONNECTION'],
  host: process.env['DB_HOST'],
  port: Number(process.env['DB_PORT']),
  name: process.env['DB_DATABASE'],
};

export const port = Number(process.env['API_PORT']) || 5000;
