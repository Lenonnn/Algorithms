import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './routes.js'

const port = process.env.PORT || 3000;
const app = express()

app.use(express.json()) 
app.use(routes)

dotenv.config()
global.db = mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');

});
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');

}); 


  app.listen(port);
    console.log(' Api is running on port', port);
  
 