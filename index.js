import express from 'express'
import { errorHandler } from './middlewares/errorHandler.js'
import { makeRouter } from './factories/router.js'
import { sequelize } from './models/sequelize.js'
import { Link } from './models/link.js'
import { Product } from './models/product.js'
import { createLinkSchema, updateLinkSchema } from './schemas/link.js'
import { createProductSchema, updateProductSchema } from './schemas/product.js'

const app = express()

app.use(express.json())

app.use('/links', makeRouter({ Model: Link, createSchema: createLinkSchema, updateSchema: updateLinkSchema }))
app.use('/products', makeRouter({ Model: Product, createSchema: createProductSchema, updateSchema: updateProductSchema }))

app.get('/:slug', async (req, res) => {
  const link = await Link.findOne({ where: { slug: req.params.slug } })
  if (!link) {
    return res.status(404).json({ error: 'Link not found' })
  }

  res.redirect(link.url)
})

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Errores (debe ir al final)
app.use(errorHandler)

await sequelize.sync()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`)
})
