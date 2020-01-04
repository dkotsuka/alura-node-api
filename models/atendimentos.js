const conexao = require('../infraestrutura/conexao')

class Atedimento {
    adiciona(atendimento) {
        const sql = `INSERT INTO atendimentos SET ?`
        conexao.query(sql, atendimento, (erro, resultados) => {
            if(erro) {
                console.log(erro)
                return
            }
            console.log(resultados)
        })
    }
}
module.exports = new Atedimento