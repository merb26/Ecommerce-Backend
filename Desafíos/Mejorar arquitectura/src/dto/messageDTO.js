class MessageDTO {
  constructor({ email, dateAndHour, text }) {
    this.email = email
    this.dateAndHour = dateAndHour
    this.text = text
  }
}

const asDTO = messages => {
  if (Array.isArray(messages))
    return messages.map(message => new MessageDTO(message))
  else return new MessageDTO(messages)
}

module.exports = { asDTO }
