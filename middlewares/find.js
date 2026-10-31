export const find = Model => async (req, res, next) => {
  const resource = await Model.findByPk(req.params.id)
  if (!resource) {
    return res.status(404).json({ error: 'resource not found' })
  }

  req.resource = resource
  next()
}
