const Atendimento = require('../models/atendimentos')
module.exports = app => {

    app.route('/atendimentos')
        .get((req, resp) => {
            resp.send("Você está na rota de atendimentos e está fazendo um GET")
        })
        .post((req, resp) => {
            const atendimento = req.body
            Atendimento.adiciona(atendimento, resp)
        })
}