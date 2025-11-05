// src/middleware/validation.ts
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// ------------------------
// Validate user registration
// ------------------------
export const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.base": `"name" must be text`,
      "string.empty": `"name" cannot be empty`,
      "any.required": `"name" is required`
    }),
    email: Joi.string().email().required().messages({
      "string.empty": `"email" cannot be empty`,
      "any.required": `"email" is required`
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": `"password" should have at least 8 characters`,
      "string.empty": `"password" cannot be empty`,
      "any.required": `"password" is required`
    }),
    role: Joi.string().valid("learner", "tutor", "admin").required().messages({
      "any.only": `"role" must be learner, tutor, or admin`,
      "any.required": `"role" is required`
    })
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error: any) {
    return res.status(422).json({ success: false, message: error.message });
  }
};

// ------------------------
// Validate login
// ------------------------
export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": `"email" cannot be empty`,
      "any.required": `"email" is required`
    }),
    password: Joi.string().required().messages({
      "string.empty": `"password" cannot be empty`,
      "any.required": `"password" is required`
    })
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error: any) {
    return res.status(422).json({ success: false, message: error.message });
  }
};

// ------------------------
// Validate tutor profile creation/update
// ------------------------
export const validateTutor = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
   
    languages: Joi.array().items(Joi.string()).min(1).required().messages({
      "array.min": `"languages" must have at least one language`,
      "any.required": `"languages" is required`
    }),
    pricePerHour: Joi.number().positive().required().messages({
      "number.base": `"pricePerHour" must be a number`,
      "number.positive": `"pricePerHour" must be positive`,
      "any.required": `"pricePerHour" is required`
    }),
    videoDescriptionUrl: Joi.string().uri().optional(),
    textDescription: Joi.string().optional(),
    schedule: Joi.array().items(
      Joi.object({
        dayOfWeek: Joi.number().min(0).max(6).required(),
        startTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
        endTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required()
      })
    ).optional()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error: any) {
    return res.status(422).json({ success: false, message: error.message });
  }
};
