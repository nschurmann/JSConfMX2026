export const create = Model => async (req, res, next) => {
  req.resource = await Model.create(req.body)
  next()
}
