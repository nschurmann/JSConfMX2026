// ============================================
// 1. Recibir una función como argumento
// ============================================
// map, filter y reduce son HOFs: reciben la función que describe qué hacer.

const applyTwice = (fn, value) => fn(fn(value))

const increment = n => n + 1
const square = n => n * n

console.log(applyTwice(increment, 5)) // 7
console.log(applyTwice(square, 3)) // 81

// Lo mismo con un callback anónimo
console.log(applyTwice(n => n * 10, 2)) // 200

// ============================================
// 2. Devolver una función
// ============================================
// negate recibe un predicado y devuelve uno nuevo con el resultado invertido.

const negate = predicate => (...args) => !predicate(...args)

const isEven = n => n % 2 === 0
const isOdd = negate(isEven)

console.log([1, 2, 3, 4].filter(isEven)) // [ 2, 4 ]
console.log([1, 2, 3, 4].filter(isOdd)) // [ 1, 3 ]

// ============================================
// 3. Envolver una función para agregarle comportamiento
// ============================================
// withTiming no cambia la lógica de fn: la envuelve y mide cuánto tarda.


const withTiming = (label, fn) => (...args) => {
  const start = performance.now()
  const result = fn(...args)
  const elapsed = (performance.now() - start).toFixed(2)

  console.log(`${label} tardó ${elapsed} ms`)

  return result
}

const sumRange = n => {
  let total = 0

  for (let i = 1; i <= n; i++) {
    total += i
  }

  return total
}

const timedSumRange = withTiming('sumRange', sumRange)

console.log(timedSumRange(1000)) // 500500


