// server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.post('/run-command', (req, res) => {
    const command = req.body.command;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Error: ${error.message}`);
        }
        res.send(`stdout: ${stdout}\nstderr: ${stderr}`);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
