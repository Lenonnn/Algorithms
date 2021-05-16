import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  agency: { type: Number, required: true },
  account: { type: Number, required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: true }
})

const Accounts = mongoose.model('Accounts', accountSchema)

export default Accounts
