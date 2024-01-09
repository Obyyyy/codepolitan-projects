const express = require('express')
const app = express()


app.get('/get', (req, res) => {
    res.send('GET Response')
});


const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});