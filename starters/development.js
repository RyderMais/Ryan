const child_process = require('child_process');
require('dotenv').config({
    path: './.env.development'
});

child_process.spawn('node', ['start.js'], {
    stdio: 'inherit',
    shell: true,
    env: {
        ...process.env,
        NODE_ENV: 'development'
    }
});