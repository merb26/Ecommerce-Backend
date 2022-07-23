const express = require('express')
const Container = require('./fileManagement')

const app = express()
const container = new Container('./products.txt')

app.get('/products' , (request, response) =>{
    container.getAll()
    .then(resp => response.send(resp))
})

app.get('/productRandom' , (request, response) =>{
    container.getByRandom()
    .then(resp => response.send(resp))
})

const server = app.listen('8080', () => {
    console.log(`Escuchando al servidor http: ${server.address().port}`)
})