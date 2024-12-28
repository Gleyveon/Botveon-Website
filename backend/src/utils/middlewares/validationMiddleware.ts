import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';  

// Take the req with body and validate the data using a schema object
export function validateData(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path,
        })),
      });
    }

    next();
  };
}
