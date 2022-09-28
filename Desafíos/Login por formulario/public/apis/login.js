const startSesion = e => {
  const name = document.querySelector("#name").value

  let hasAName = false

  name === "" ? alert("Debe ingresar nombre") : (hasAName = true)

  const sesion = {
    name,
  }

  if (hasAName) {
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
