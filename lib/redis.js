const redis = require("redis");

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});

client.on('connect', () => {
    console.log('Redis Connected...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (error) => {
  // client.disconnect(true);
  console.log(`[*] Redis error:\n${error}`);
});

client.on('end', () => {
  console.log('Client disconected...');
});

module.exports = client;