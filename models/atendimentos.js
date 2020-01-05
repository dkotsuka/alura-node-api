const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


class Atedimento {
    adiciona(atendimento, resp) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
        const validacoes = [
            {
                nome: 'data',
                mensagem: 'Data deve ser igual ou mais recente que a data atual.',
                valido: dataEhValida
            },
            {
                nome: 'cliente',
                mensagem: 'Cliente deve conter mais de cinco caracteres.',
                valido: clienteEhValido
            }
        ]

        const erros = validacoes.filter(validacao => !validacao.valido)
        const contemErro = erros.length

        if(contemErro) {
            return resp.status(400).json(erros)
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        const sql = `INSERT INTO atendimentos SET ?`
        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro) {
                console.log("erro ao cadastrar no banco de dados",erro)
                return resp.status(400).json(erro)
            }
            console.log("dados cadastrados com sucesso", resultados)
            resp.status(201).json(resultados)
        })
    }
}
module.exports = new Atedimento