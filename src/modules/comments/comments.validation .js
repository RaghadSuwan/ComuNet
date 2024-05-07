import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCommunity = joi.object({

});
export const specificCommunity = joi.object({
    id: joi.string().min(24).max(24).required(),
});
