const MONGO_URL = process.env.MONGO_URL || undefined;
const REDIS_URL = process.env.REDIS_URL || undefined;

module.exports = {
  MONGO_URL, //: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL, //: '//localhost:6378'
};

// MONGO_URL= "mongodb://the_username:the_password@localhost:3456/the_database"
// the form for redis_url: redis://host:port
// REDIS_URL= "redis://localhost:6379"
