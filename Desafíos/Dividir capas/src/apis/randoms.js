process.on("message", products => {
  let totalProducts = products.length

  const chooseProduct = Math.round(Math.random() * --totalProducts)

  const idRandom = Math.round(Math.random() * 1000)

  const product = { ...products[chooseProduct], idRandom }

  process.send(product)
})
