const redisModule = require('./redisModule');

(async () => {
  try {
    // Example usage of Redis methods
    await redisModule.set('name', 'John');
    const name = await redisModule.get('name');
    console.log('Name:', name);

    await redisModule.hmset('user:1', 'username', 'johndoe', 'email', 'john@example.com');
    const userMap = await redisModule.hgetall('user:1');
    console.log('User:', userMap);

    await redisModule.lpush('tasks', 'task1', 'task2', 'task3');
    const tasks = await redisModule.lrange('tasks', 0, -1);
    console.log('Tasks:', tasks);

    await redisModule.sadd('tags', 'javascript', 'nodejs', 'redis');
    const tags = await redisModule.smembers('tags');
    console.log('Tags:', tags);

    await redisModule.zadd('scores', 100, 'player1', 200, 'player2');
    const highScores = await redisModule.zrange('scores', 0, -1);
    console.log('High Scores:', highScores);

    await redisModule.expire('temporary_key', 10);
    setTimeout(async () => {
      const temporaryValue = await redisModule.get('temporary_key');
      console.log('Temporary Value:', temporaryValue); // Should be null
      redisModule.quit();
    }, 11000);
    
    // Pub/Sub Example
    redisModule.subscribe('channelName', (channel, message) => {
      console.log(`Received message on ${channel}: ${message}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
