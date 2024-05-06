import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCommunity = joi.object({
    name: joi.string().min(3).max(20).required(),
    file: generalFields.file.required(),
    description:joi.string().max(200).required(),
});
export const specificCommunity = joi.object({
    id: joi.string().min(24).max(24).required(),
});
export const updateCommunity = joi.object({
    name: joi.string().min(3).max(10).required(),
    file: generalFields.file.required(),
    description:joi.string().max(200).required(),
});