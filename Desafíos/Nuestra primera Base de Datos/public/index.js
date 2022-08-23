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
            ${product.urlPicture}
        </td>
    </tr>
    `
  )

  elementProducts.innerHTML = html.join("")
}

socket.on("products", products => {
  render(products)
})

socket.on("messages", messages => {
  const elementText = document.querySelector("#messages")
  const html = messages.map(message => {
    return `
    <div class="row">
      <div class="col text-end">
        <strong class="text-primary">${message.email}</strong> <div class="message">${message.dateAndHour}</div>: 
      </div>
      <div class="col text-start text-success">
        <em>${message.text}</em>
      </div>
    </div>
    `
  })

  elementText.innerHTML = html.join("")
})

const addText = e => {
  const email = document.querySelector("#email").value
  const text = document.querySelector("#text").value

  if (email === "") {
    return alert("Debe ingresar correo electrónico")
  }

  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const age = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const dateAndHour = `[${day}/${month}/${age} ${hours}:${minutes}:${seconds}]`

  const message = {
    email,
    dateAndHour,
    text,
  }
  socket.emit("messageSent", message)
  document.getElementById("text").value = ""

  return false
}

const addProduct = e => {
  const productNew = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    urlPicture: document.querySelector("#urlPicture").value,
  }
  socket.emit("productNew", productNew)

  return false
}
