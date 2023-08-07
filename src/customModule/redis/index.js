const redisClient = require("./redisServer");
// Rest of your Express app setup
// ...

const redisModule = {
    set: async (key, value) => {

        return redisClient.set(key, JSON.stringify(value)).then(e => {
            return e;
        }).catch(error => {
            console.log("error in set", error);
        });

    },

    get: async (key) => {
        return redisClient.get(key).then(value => {
            return JSON.parse(value);
        }).catch(error => {
            console.log("error in get", error);
        });
    },

    hmset: async (key, fieldsAndValues) => {
        return redisClient.mSet(key, fieldsAndValues);
    },

    hgetall: (key) => {
        return new Promise((resolve, reject) => {
            redisClient.mGet(key, (err, resultMap) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultMap);
                }
            });
        });
    },

    lpush: (key, ...values) => {
        return new Promise((resolve, reject) => {
            redisClient.lpush(key, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    lrange: (key, start, stop) => {
        return new Promise((resolve, reject) => {
            redisClient.lrange(key, start, stop, (err, resultArray) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultArray);
                }
            });
        });
    },

    sadd: (key, ...members) => {
        return new Promise((resolve, reject) => {
            redisClient.sadd(key, members, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    smembers: (key) => {
        return new Promise((resolve, reject) => {
            redisClient.smembers(key, (err, resultArray) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultArray);
                }
            });
        });
    },

    zadd: (key, ...membersWithScores) => {
        return new Promise((resolve, reject) => {
            redisClient.zadd(key, membersWithScores, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    zrange: (key, start, stop) => {
        return new Promise((resolve, reject) => {
            redisClient.zrange(key, start, stop, (err, resultArray) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultArray);
                }
            });
        });
    },

    expire: (key, seconds) => {
        return new Promise((resolve, reject) => {
            redisClient.expire(key, seconds, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    publish: (channel, message) => {
        redisClient.publish(channel, message);
    },

    subscribe: (channel, messageHandler) => {
        redisClient.subscribe(channel);
        redisClient.on('message', messageHandler);
    },

    quit: () => {
        redisClient.quit();
    }
};

module.exports = redisModule;
