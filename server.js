const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.static("public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// the endpoint for contact form submissions
app.post('/submit-form', (req, res) => {
    const formData = req.body;

    let data = [];
    try {
        const jsonData = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(jsonData);
    }
    catch (err) {
        console.log('No existing file, starting with empty array');
    }

    // add the new data to the array.
    data.push(formData);

    // write to the file
    fs.writeFileSync('data.json', JSON.stringify(formData, null, 2));

    // send the response
    res.json({message: 'Form Data Saved Successfully'});
});

app.listen(3000, () => {
    console.log('Server is now live on port 3000');
});
