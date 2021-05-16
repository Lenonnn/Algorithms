import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();
app.use(express.json());

app.use("/carros", carrosRouter);

// Deixa a aplicação sempre em uso
// Imprime a data no console para da req
// Muda pra próxima função chamando next();
app.use((req, res, next) => {
    console.log(new Date());
    next();
});

app.get("/teste", (req, res) => {
    res.end();
});

app.listen(3000, () => {
    console.log("API Started");
});