const express = require('express');
const {convertToMorse} = require('./utils.js')
translationAPI = require('translate-google-api');
cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post("/translate", async(req,res) => {
    try {
        const {text, from, to} = req.body

        if(!text.trim()){
            throw(Error("Input field is empty!"))
        }

        console.log(convertToMorse)
        
        const response = to === "mors" ? await convertToMorse(text) : await translationAPI(text, { from: from, to: to });

        console.log(response)

        return res.status(200).json({
            status: "success",
            text: response[0]});
    } catch (err) {
        return err.message === "Input field is empty!" ? 
        res.status(400).json({status: "Failed", message: err.message}): 
        res.status(500).json({status: "Failed", message: err.message})
    }
    });

app.listen(PORT, ()=>{console.log(`Server running on ${PORT}`)})