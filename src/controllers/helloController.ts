import { Request, Response, NextFunction } from 'express';

const getWorld = (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello ' + req.params.world);
};

export default { getWorld };
