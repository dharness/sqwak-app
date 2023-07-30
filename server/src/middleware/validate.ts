import { ArraySchema, ObjectSchema } from "joi";

const validate =
  (schema: ObjectSchema<any> | ArraySchema<any>) => (req, res, next) => {
    const body = req.body;
    if (!body) return res.status(400).send("No body provided");

    const { error, value } = schema.validate(body);
    if (error) return res.status(400).send(error.message);
    next();
  };

export { validate };
