const joi = require('@hapi/joi');

const schemaForNewStock = joi.object({
    symbol : joi.string().case('upper').pattern(/([A-Z0-9])\w+/).required(),
    series : joi.string().case('upper').required(),
    date : joi.date().required(),
    tradedqty : joi.number().integer().required(),
    deliverableqty : joi.number().required(),
    dlytotraded : joi.number().integer().required()
    
})
const schemaForUpdateStock = joi.object({
    symbol : joi.string().case('upper').pattern(/([A-Z0-9])\w+/),
    series : joi.string().pattern(/([A-Z])\w+/),
    date : joi.date(),
    tradedqty : joi.number().integer(),
    deliverableqty : joi.number(),
    dlytotraded : joi.number().integer()
})
module.exports = {schemaForNewStock,schemaForUpdateStock}