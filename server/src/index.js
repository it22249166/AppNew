const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getCurrencies", async (req, res) => {

    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=8a698fe59b1b4c62ae29f47d94f32b0e";
    try {
        const namesResponse = await axios.get(nameURL);
        const nameData = namesResponse.data;

        return res.json(nameData);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch currencies" });
   
    }
});

//exchange rate
app.get("/getExchangeRate", async (req, res) => {
    const { sourceCurrency, targetCurrency, date } = req.query;
    const exchangeRateURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=8a698fe59b1b4c62ae29f47d94f32b0e&symbols=${sourceCurrency},${targetCurrency}`;

    try {
        const exchangeRateResponse = await axios.get(exchangeRateURL);
        const exchangeRateData = exchangeRateResponse.data;

        return res.json(exchangeRateData);

    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch exchange rate" });
    }
});
//listen to a port
app.listen(4000, () => {
    console.log('Server is running on port 4000');
    });