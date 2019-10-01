const joi = require('@hapi/joi');

const schemaForNewCompany = joi.object({
    symbol : joi.string().case('upper').pattern(/([A-Z0-9])\w+/).required(),
    companyname : joi.string().required(),
    series : joi.string().case('upper').required(),
    dateoflisting : joi.date().required(),
    paidupvalue : joi.number().integer(),
    marketlot : joi.number().min(1).max(10),
    isinnumber : joi.string().alphanum().min(12).max(12).required(),
    facevalue : joi.number().integer()
})
const schemaForUpdateCompany = joi.object({
    companyname:joi.string().pattern(/([A-Z])\w+/),
    series: joi.string().case('upper'),
    dateoflisting : joi.date(),
    paidupvalue : joi.number().integer(),
    marketlot : joi.number().min(1).max(10),
    isinnumber : joi.string().alphanum().min(12).max(12),
    facevalue : joi.number().integer()
})
module.exports = {schemaForNewCompany,schemaForUpdateCompany}