import Joi from 'joi'

// Schema basado en el modelo Product
export const productSchema = Joi.object({
  id: Joi.number().integer().alter({
    create: s => s.forbidden(),
    update: s => s.optional()
  }),
  name: Joi.string().required().alter({
    update: s => s.optional()
  }),
  price: Joi.number().positive().required().alter({
    update: s => s.optional()
  })
})

export const updateProductSchema = productSchema.tailor('update')
export const createProductSchema = productSchema.tailor('create')
