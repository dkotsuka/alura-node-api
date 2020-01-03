const express = require('express')
const app = express()

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

app.get('/atendimentos', (req, resp) => {
    resp.send("Você está na rota de atendimentos.")
})