const startSesion = e => {
  const email = document.querySelector("#email").value

  let hasAEmail = false

  email === "" ? alert("Debe ingresar email") : (hasAEmail = true)

  const sesion = {
    email,
  }

  if (hasAEmail) {
    fetch("/index", {
      method: "POST",
      body: JSON.stringify(sesion),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(json => location.replace("/index"))
      .catch(err => console.log(err))
  }

  return false
}
