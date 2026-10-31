// ============================================
// Middleware chain
// ============================================

import express from 'express'

const app = express()

// crear 3 middlewares
// el primero asigna un objeto product dentro de request
// el segundo asigna el usuario
// el tercero valida que el usuario sea dueno del producto
const logger = texto => (req, res, next) => {
  console.log(texto)
  next()
  console.log('hola')
}

const auth = (req, res, next) => {
  console.log('validando usuario...')
  req.user = { id: 1, name: 'chanchito feliz'}
  next()
}

const product = (req, res, next) => {
  console.log('asignando producto')
  req.product = { id: 1, name: 'producto'}
  next()
}

const isOwner = (req, res, next) => {
  console.log('isOwner...')
  next()
}

app.get('/', auth, product, isOwner, isOwner, isOwner, isOwner,(req, res) => {
  console.log('getting!')
  res.status(200).send('hola mundo')
})

app.get('/hola', auth, (req, res) => {
  console.log('hola', req.user)
  res.status(200).send('hola!')
})

const server = app.listen(3000)

// compose! them!


// augment them!


