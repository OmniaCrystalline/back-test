/** @format */
const Joi = require('joi')

async function getPagedData(model, page, limit) {
  const skip = (page - 1) * limit;

  const data = await model.find().skip(skip).limit(limit);
  const totalCount = await model.countDocuments();

  return {
    data,
    page,
    limit,
    totalCount,
  };
}

const pagValidator = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1)
})

module.exports = {
  getPagedData,
  pagValidator,
};