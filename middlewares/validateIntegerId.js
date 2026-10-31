export const validateIntegerId = (req, res, next) => {
  if (!Number.isInteger(Number(req.params.id))) {
    return res.status(400).json({ error: 'id must be an integer' })
  }

  next()
}
