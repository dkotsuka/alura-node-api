const Atendimento = require('../models/atendimentos')
module.exports = app => {

    app.route('/atendimentos')
        .get((req, resp) => {
            Atendimento.lista(resp)
        })
        .post((req, resp) => {
            const atendimento = req.body
            Atendimento.adiciona(atendimento, resp)
        })

    app.route('/atendimentos/:id')
        .get((req, resp) => {
            const id = parseInt(req.params.id)
            Atendimento.buscaPorId(id, resp)
        })
        .patch((req, resp) => {
            const id = parseInt(req.params.id)
            const valores = req.body
            Atendimento.atualiza(id, valores, resp)
        })
        .delete((req, resp) => {
            const id = parseInt(req.params.id)
            Atendimento.deleta(id, resp)
        })
}