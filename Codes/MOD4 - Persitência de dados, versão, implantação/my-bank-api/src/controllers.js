import Accounts from './models.js'

class Controller {
  async store(req, res) {
    const [{ agency, account, name, balance }] = req.body
    
    if(!agency || !account || !name || !balance)
      return res.status(400).json({ error: 'Parâmetros agency, account, name e balance são obrigatórios'})

    const newAccount = await Accounts.create(req.body)

    return res.status(200).json(newAccount)
  }

  async index(req, res) {
    const data = await Accounts.find()

    return res.status(200).json(data)
  }

  async deposit(req, res) {
    const { agency, account, value } = req.body

    if(!agency || !account || !value)
      return res.status(400).json({ error: 'Parâmetros agency, account e value são obrigatórios'})

    if(value <= 0) 
      return res.status(400).json({ error: 'O valor deve ser positivo'})

    try {
      const result = await Accounts.findOneAndUpdate(
        { agency: agency, account: account },
        { $inc: { balance: value } }
      )

      if(!result) 
        return res.status(404).json({ error: 'Conta não encontrada'})
    } catch (error) {
      return res.status(400).json({ error: 'Erro desconhecido'})
    }

    const result = await Accounts.find(
      { agency: agency, account: account },
      { _id: 0, name: 1, balance: 1 }
    )

    return res.status(200).json(result)
  }

  async withdraw(req, res) {
    const { agency, account, value } = req.body

    if(!agency || !account || !value)
      return res.status(400).json({ error: 'Parâmetros agency, account e value são obrigatórios'})

    try {
      const result = await Accounts.findOneAndUpdate(
        { agency: agency, account: account, balance: { $gte: value + 1 }  },
        { $inc: { balance: -value - 1 } }
      )

      if(!result) {
        const [{ balance }] = await Accounts.find(
          { agency: agency, account: account },
          { _id: 0, balance: 1 }
        )
        
        return res.status(400).json({ error: 'Saldo Insuficiente', balance: balance })
      }
        
    } catch (error) {
      return res.status(404).json({ error: 'Conta não encontrada'})
    }

    const result = await Accounts.find(
      { agency: agency, account: account },
      { _id: 0, name: 1, balance: 1 }
    )

    return res.status(200).json(result)
  }

  async checkBalance(req, res) {
    const { agency, account } = req.body

    if(!agency || !account)
      return res.status(400).json({ error: 'Parâmetros agency e account são obrigatórios'})

    try {
      const findAccount = await Accounts.findOne({ agency, account })

      return res.status(200).json({'Saldo Atual': findAccount.balance})
    } catch (error) {
      return res.status(404).json({ error: 'Conta não encontrada'})
    }
  }

  async destroy(req, res) {
    const { agency, account } = req.body

    if(!agency || !account)
      return res.status(400).json({ error: 'Parâmetros agency e account são obrigatórios'})

    try {
      const findAccount = await Accounts.findOneAndDelete({ agency, account })

      if(!findAccount)
        return res.status(404).json({ error: 'Conta não encontrada'})

      const findAgency = await Accounts.find({ agency })

      return res.status(200).json({agency: agency, 'Contas Ativas': findAgency.length})
    } catch (error) {
      return res.status(400).json({ error: 'Erro desconhecido'})
    }
  }

  async transfer(req, res) {
    const { origin, destiny, value } = req.body

    if(!origin || !destiny || !value)
      return res.status(400).json({ error: 'Parâmetros origin, destiny e value são obrigatórios'})

    const findOrigin = await Accounts.findOne({ account: origin })
    const findDestiny = await Accounts.findOne({ account: destiny })

    if(!findOrigin || !findDestiny)
      return res.status(404).json({ error: 'Conta não encontrada'})

    if(value > findOrigin.balance)
      return res.status(400).json({ error: 'Saldo insuficiente', 'Saldo Atual': findOrigin.balance})

    if(findOrigin.agency != findDestiny.agency) {
      findOrigin.balance -= value + 8
      findDestiny.balance += value
    } else {
      findOrigin.balance -= value
      findDestiny.balance += value
    }

    await findOrigin.save()
    await findDestiny.save()

    return res.status(200).json(findOrigin.balance)
  }

  async average(req, res) {
    const { agency } = req.body

    if(!agency)
      return res.status(400).json({ error: 'Parâmetro agency é obrigatório'})

    try {
      const findAccount = await Accounts.aggregate([
        { $match: { agency: agency } },
        { $group: { _id: '$agency', average: { $avg: '$balance' } } },
        { $project: { _id: 0, average: 1 } }
      ])

      if(findAccount.length == 0)
        return res.status(404).json({ error: 'Nenhuma conta encontrada'})

      return res.status(200).json(findAccount)
    } catch (error) {
      return res.status(400).json({ error: 'Erro desconhecido'})
    }
  }

  async minBalance(req, res) {
    const { limit } = req.body

    if(limit <= 0)
      return res.status(400).json({ error: 'Parâmetro limit é obrigatório'})

    const findAccount = await Accounts.aggregate([
      { $sort: { balance: 1 } },
      { $project: {_id: 0, agency: 1, account: 1, balance: 1 } }
    ]).limit(limit)

    return res.status(200).json(findAccount)
  }

  async maxBalance(req, res) {
    const { limit } = req.body

    if(limit <= 0)
      return res.status(400).json({ error: 'Parâmetro limit é obrigatório'})

    const findAccount = await Accounts.aggregate([
      { $sort: { balance: -1, name:1 } },
      { $project: {_id: 0, agency: 1, account: 1, name: 1, balance: 1 } }
    ]).limit(limit)

    return res.status(200).json(findAccount)
  }

  async private(req, res) {
    const distinct = await Accounts.distinct('agency')

    for(let number of distinct) {
      const result = await Accounts.aggregate([
        { $match: { agency: number } },
        { $group: { _id: null, max: { $max: '$balance' } } }
      ])

      const [{ max }] = result

      await Accounts.findOneAndUpdate(
        { balance: max }, 
        { agency: 99 }
      )
    }

    const result = await Accounts.find({ agency: 99 })

    return res.status(200).json(result)
  }
}

export default Controller