const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apps: [
    {
      name: 'beastie-booze',
      script: './server/app.js',
      env: {
        NODE_ENV: 'development',
        API_KEY: process.env.API_KEY,
        ATLAS_URL: process.env.ATLAS_URL,
      },
      env_production: {
        NODE_ENV: 'production',
        API_KEY: process.env.API_KEY,
        ATLAS_URL: process.env.ATLAS_URL,
      },
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-83-145-45.compute-1.amazonaws.com',
      key: '~/.ssh/beastie.pem',
      ref: 'origin/main',
      repo: 'git@github.com:The-Pump/BeastieBooze.git',
      path: '/home/ubuntu/BeastieBooze',
      // need to figure out how to run these commands without installing locally
      // it might be as simple as adding them after the pm2 command
      // taking out these 2 for now since they break the deploy:
      // npm install && npm run build:prod
      'post-deploy': 'npm run-script restart',
      env: {
        NODE_ENV: 'development',
        API_KEY: process.env.API_KEY,
        ATLAS_URL: process.env.ATLAS_URL,
      },
      env_production: {
        NODE_ENV: 'production',
        API_KEY: process.env.API_KEY,
        ATLAS_URL: process.env.ATLAS_URL,
      },
    },
  },
};
