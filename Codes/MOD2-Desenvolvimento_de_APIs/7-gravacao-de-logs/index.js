import express from "express";

//Biblioteca para tratamentos de logs para node;
import winston from "winston";

const app = express();
app.use(express.json());

// Desestrutura o winston para usar soment o Printf
const { combine, printf, label, timestamp } = winston.format;


// Define formato que vai imprimir lá no ' format : combnine ...'
// Level: nível de 0 até 6 
// Message: a mensagem que queremos copiar
// Label: Label da aplicação
// Timestamp: Data e hora
const myFormat = printf(({ level, message, label, timestamp }) => {
    // Retorna sting de log usando ( Interpolação / String literals)
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
    // Escolher nível ( 0 a 6)
    // Vai ignorar os todos os níveis abaixo do nível selecionado
    level: "silly",
    //Pra onde enviar o Log
    transports: [
        // Envia par o console.log
        new (winston.transports.Console)(),
        //  Envia Log para o arquivo - Definir nome do arquivo de log
        new (winston.transports.File)({ filename: "my-log.log" })
    ],
    // Definir combine ( fomrato que queremos combinar para o formato)
    format: combine(
        // Define Label
        label({ label: "my-app" }),
        // Importa timestamp do winston
        timestamp(),
        // Passa formato criado
        myFormat
    )
});

logger.error("Error log"); // nível 0
logger.warn("Warn log"); // nível 1
logger.info("Info log"); // nível 2
logger.verbose("Verbose log"); // nível 3
logger.debug("Debug log"); // nível 5
logger.silly("Silly log"); // nível 6

// Forma diferente de passar o tipo de log e a mensagem
logger.log("info", "Hello with parameter!"); 

app.listen(3000, () => {
    console.log("API Started");
});

// Linka da aula: https://youtu.be/951hT2BxTFY