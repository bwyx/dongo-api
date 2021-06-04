import { Request, Response } from 'express';

const getWorld = (req: Request, res: Response): void => {
  res.send(`Hello ${req.params.world}`);
};

export default { getWorld };
