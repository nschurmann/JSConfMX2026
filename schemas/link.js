import Joi from 'joi'

// Schema basado en el modelo Link
export const linkSchema = Joi.object({
  id: Joi.number().integer().alter({
    create: s => s.forbidden(),
    update: s => s.optional()
  }),
  slug: Joi.string().required().alter({
    update: s => s.optional()
  }),
  url: Joi.string().required().alter({
    update: s => s.optional()
  })
})

export const updateLinkSchema = linkSchema.tailor('update')
export const createLinkSchema = linkSchema.tailor('create')
