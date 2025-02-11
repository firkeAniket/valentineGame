const express = require('express');
const { loveCalculator, fetchCompatibilityQuestions, checkCompatibility } = require("./service");
const app = express()
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const valentine = async () => {
    app.post('/love-calculator', async(req, res) => {
        let data = loveCalculator(req.body,res);
        res.send(data)
    })

    app.get("/compatibility-test", (req,res) => {
        let data = fetchCompatibilityQuestions();
        res.json(data)
    });

    app.post("/compatibility-test/submit", (req, res) => {
        let data = checkCompatibility(req.body,res);
        res.json(data)
    });
};
valentine();

app.listen(3005)