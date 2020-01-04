const customExpress = require('./config/custom-express')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
const app = customExpress()

conexao.connect((erro) => {
    if(erro){
        console.log(erro)
        return
    }

    Tabelas.init(conexao)
    console.log('Banco de dados conectado com sucesso')
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000")
    })
})

