const redis = require("redis");

const KEY_EXPIRING_TIME = 10;

const client = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: process.env.REDIS_PORT, 
});

client.on('connect', () => {
    console.log('Redis Connected...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (error) => {
  console.log(`[*] Redis error:\n${error}`);
});

client.on('end', () => {
  console.log('Client disconected...');
});

module.exports = client;