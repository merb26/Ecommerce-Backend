const socket = io().connect()

socket.on("messages", messages => {
  console.log(messages)
  const schemaAuthor = new normalizr.schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  )

  const schemaMessage = new normalizr.schema.Entity("messages", {
    author: schemaAuthor,
  })

  const desnormalizeMessages = normalizr.denormalize(
    messages.normalized,
    schemaMessage,
    messages.normalized.entities
  )

  const entitieMessages = desnormalizeMessages.entities.messages

  const messagesData = []

  for (let index = 0; index < desnormalizeMessages.result.length; index++) {
    const element = desnormalizeMessages.result[index]
    const messageDesnormalized = {
      email: entitieMessages[element].author,
      dateAndHour: entitieMessages[element].dateAndHour,
      text: entitieMessages[element].text,
    }

    messagesData.push(messageDesnormalized)
  }

  // Calcula la compresión

  const desnormalizeLength = JSON.stringify(desnormalizeMessages).length

  const resultCompression =
    100 - Math.round((desnormalizeLength * 100) / messages.dataLength)

  document.querySelector(
    "#compression"
  ).innerHTML = `Compresión( ${resultCompression}%
     )`

  // Agrega los elementos

  const elementText = document.querySelector("#messages")
  const html = messagesData.map(message => {
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
  const name = document.querySelector("#name").value
  const lastName = document.querySelector("#lastName").value
  const age = document.querySelector("#age").value
  const alias = document.querySelector("#alias").value
  const avatar = document.querySelector("#avatar").value

  if (email === "") {
    return alert("Debe ingresar correo electrónico")
  }

  const now = new Date()
  const day = now.getDate()
  const month = now.getMonth() + 1
  const age2 = now.getFullYear()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const dateAndHour = `[${day}/${month}/${age2} ${hours}:${minutes}:${seconds}]`

  const author = {
    email,
    name,
    lastName,
    age,
    alias,
    avatar,
  }

  const message = {
    author,
    dateAndHour,
    text,
  }
  socket.emit("messageSent", message)
  document.getElementById("text").value = ""

  return false
}
