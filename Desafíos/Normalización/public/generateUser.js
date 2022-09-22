import { faker } from "https://cdn.skypack.dev/@faker-js/faker"

document.querySelector("#email").value = faker.internet.email()
document.querySelector("#name").value = faker.name.firstName()
document.querySelector("#lastName").value = faker.name.lastName()
document.querySelector("#age").value = faker.commerce.price(18, 80, 0)
document.querySelector("#alias").value = faker.name.middleName()
document.querySelector("#avatar").value = faker.image.avatar()
