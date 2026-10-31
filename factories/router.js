import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import { validateIntegerId } from '../middlewares/validateIntegerId.js'
import { find } from '../middlewares/find.js'
import { create } from '../middlewares/create.js'
import { destroy } from '../middlewares/destroy.js'

// Rutas CRUD de un recurso, montadas en su path
export const makeRouter = ({ Model, createSchema, updateSchema }) => {
  const router = Router()

  // Listar
  router.get('/', async (req, res) => {
    const items = await Model.findAll()
    res.json(items)
  })

  // Crear
  router.post('/', validateSchema(createSchema), create(Model), (req, res) => {
    res.status(201).json(req.resource)
  })

  // Actualizar
  router.put('/:id', validateIntegerId, find(Model), validateSchema(updateSchema), async (req, res) => {
    await req.resource.update(req.body)
    res.json(req.resource)
  })

  // Eliminar
  router.delete('/:id', validateIntegerId, destroy(Model), (req, res) => {
    res.status(204).end()
  })

  return router
}
