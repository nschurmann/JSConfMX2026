import express from 'express'
import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
})

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: false
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

// Listar
app.get('/links', async (req, res) => {
  const links = await Link.findAll()
  res.json(links)
})

// Crear
app.post('/links', async (req, res) => {
  const link = await Link.create({
    slug: req.body.slug,
    url: req.body.url
  })
  res.status(201).json(link)
})

// Actualizar
app.put('/links/:id', async (req, res) => {
  if (!Number.isInteger(Number(req.params.id))) {
    return res.status(400).json({ error: 'id must be an integer' })
  }

  const link = await Link.findByPk(req.params.id)
  if (!link) {
    return res.status(404).json({ error: 'Link not found' })
  }

  await link.update(req.body)
  res.json(link)
})

// Eliminar
app.delete('/links/:id', async (req, res) => {
  if (!Number.isInteger(Number(req.params.id))) {
    return res.status(400).json({ error: 'id must be an integer' })
  }

  const deleted = await Link.destroy({ where: { id: req.params.id } })
  if (!deleted) {
    return res.status(404).json({ error: 'Link not found' })
  }

  res.status(204).end()
})

// Redirigir (debe ir después de /links para no capturarlo)
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

await sequelize.sync()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`)
})

