const Joi = require('joi');

/**
 * @param {Joi.Schema} schema - Joi schema to validate request body
 */
module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map(d => d.message);
      return res.status(400).json({
        statusCode: 400,
        status: 0,
        message: 'Validation failed',
        errors: messages
      });
    }
    next();
  };
};
