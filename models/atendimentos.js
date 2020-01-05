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

    lista(resp) {
        const sql = `SELECT * FROM Atendimentos`
        conexao.query(sql, (erro, resultados) => {
            if(erro){
                return resp.status(400).json(erro)
            }
            return resp.status(200).json(resultados)
        })
    }

    buscaPorId(id, resp) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro){
                return resp.status(400).json(erro)
            }
            return resp.status(200).json(atendimento)
        })
    }

    atualiza(id, valores, resp) {
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`

        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                return resp.status(400).json(erro)
            }
            return this.buscaPorId(id, resp)
        })
    }

    deleta(id, resp){
        const sql = `DELETE FROM Atendimentos WHERE id=?`
        conexao.query(sql, id, (erro, resultados) => {
            if(erro){
                return resp.status(400).json(erro)
            }
            return resp.status(201).send(`Atendimento ${id} deletado com sucesso`)
        })
    }
}
module.exports = new Atedimento