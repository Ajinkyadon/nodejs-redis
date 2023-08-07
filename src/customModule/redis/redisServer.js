const redis = require('redis');
// Create a Redis redisClient and connect to the server
const redisClient = redis.createClient({
    host: 'localhost', // Redis server hostname
    port: 6379,        // Redis server port
});

// Check if Redis connection is successful
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});
redisClient.connect();

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

module.exports = redisClient;