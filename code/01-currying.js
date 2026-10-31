// ============================================
// 1. Función normal vs. curried
// ============================================

const add = (a, b) => a + b

const addCurried = a => b => a + b

console.log(add(2, 3)) // 5
console.log(addCurried(2)(3)) // 5

// Al llamar con solo un argumento, obtenemos una función que "recuerda" el primero
const addTen = addCurried(10)

console.log(addTen(5)) // 15
console.log(addTen(20)) // 30

// ============================================
// 2. Currying con propiedades de objetos
// ============================================

const get = (name, obj) => obj[name]

const prop = name => obj => obj[name]

const users = [
  { id: 1, name: 'Ana', role: 'admin' },
  { id: 2, name: 'Luis', role: 'guest' },
  { id: 3, name: 'Marta', role: 'guest' }
]

const id = users.map(prop('id'))
// ============================================
// 3. max length
// ============================================
//

const minLength = length => value =>
  value.length >= length

const minSlugLength = minLength(3)
minPassLength = minLength(8)

minSlugLength('chanchitofeliz')
minSlugLength('hi')
