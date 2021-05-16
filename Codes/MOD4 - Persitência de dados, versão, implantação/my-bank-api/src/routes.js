import express from 'express'

import Controller from './controllers.js'

const routes = express.Router()

const controller = new Controller()

// Nova conta
routes.post('/new-account', controller.store)
// Pega Posições de todas as contas
routes.get('/index', controller.index)
// Faz depósito
routes.patch('/deposit', controller.deposit)
// Faz saque
routes.patch('/withdraw', controller.withdraw)
// Consulta Saldos 
routes.get('/balance', controller.checkBalance)
//
routes.delete('/delete', controller.destroy)
// Fazer tranferências
routes.patch('/transfer', controller.transfer)
// Média de Saldo dos clientes da agência
routes.get('/average', controller.average)
// Busca quantidade de cliente informado com o menor Saldo
// E ordena ppor Saldo em ordem crescente
routes.get('/min', controller.minBalance)
// Busca quantidade de cliente informado com o maior Saldo
// E ordena ppor Saldo em ordem crescente
routes.get('/max', controller.maxBalance)
// Busca cliente com maior saldo, e troca para { "Agência":99 }
routes.get('/private', controller.private)

export default routes