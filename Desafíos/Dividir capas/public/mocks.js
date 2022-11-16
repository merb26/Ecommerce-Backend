const socket = io().connect()

const render = data => {
  const elementProducts = document.querySelector("#products")

  const html = data.map(
    product =>
      `
    <tr>
        <td>
            ${product.title}
        </td>
        <td>
            ${product.price}
        </td>
        <td>
          <img src="${product.urlPicture}" alt="">
        </td>
    </tr>
    `
  )

  elementProducts.innerHTML = html.join("")
}

socket.on("products", products => {
  render(products)
})
