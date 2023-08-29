const child_process = require('child_process');
require('dotenv').config();

const child = child_process.spawn('nodemon /start.js --exitcrash 3 --delay 10', {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        NODE_ENV: 'production'
    }
});
