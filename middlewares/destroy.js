export const destroy = Model => async (req, res, next) => {
  const deleted = await Model.destroy({ where: { id: req.params.id } })
  if (!deleted) {
    return res.status(404).json({ error: 'resource not found' })
  }

  next()
}
