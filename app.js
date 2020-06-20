const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 8080;
const WOL_IP = process.env.WOL_IP;
const WOL_MAC = process.env.WOL_MAC;

if (!WOL_IP || !WOL_MAC) {
    console.error('[ERROR] WOL_IP or WOL_MAC environment variable is not specified');
    process.exit(1);
}

const app = express();

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', (_, res) => {
    try {
        const wol = spawn('wakeonlan', ['-i', WOL_IP, WOL_MAC]);

        wol.stdout.on('data', (data) => {
            console.log(`[INFO]: ${data}`);
        });
        
        wol.stderr.on('data', (data) => {
            console.error(`[ERROR]: ${data}`);
        });
        
        wol.on('close', (code) => {
            if (code === 0) {
                res.status(200).end();
            } else {
                res.status(500).end();
            }
            console.log(`[INFO] wakeonlan exited with: ${code}`);
        });
    }
    catch(e) {
        console.error('[ERROR]: Unexpected error');
        console.error(e);
    }

});

app.listen(PORT, () => {
    console.log(`[INFO] Received IP: ${WOL_IP}`);
    console.log(`[INFO] Received MAC: ${WOL_MAC}`);
    console.log(`[INFO] Server started on port ${PORT}`);
});