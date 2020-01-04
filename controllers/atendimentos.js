const atendimento = require('../models/atendimentos')
module.exports = app => {

    app.route('/atendimentos')
        .get((req, resp) => {
            resp.send("Você está na rota de atendimentos e está fazendo um GET")
        })
        .post((req, resp) => {
            console.log(req.body)
            atendimento.adiciona(req.body)
            resp.send("Você está na rota de atendimentos e está fazendo um POST")
        })
}