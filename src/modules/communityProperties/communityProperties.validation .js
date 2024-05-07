import joi from 'joi';

export const add= joi.object({
    propertyName: joi.string().min(3).max(20).required(),
    value:joi.string().min(3).max(30).required(),
    customer_fill:joi.boolean().required(),
    owner_fill:joi.boolean().required(),
    communityId: joi.string().required(),
});
export const specificCommunity = joi.object({
    id: joi.string().min(24).max(24).required(),
});
