import "dotenv/config";

const QUEUE_CONFIG = {
  redis: {
    host: process.env.REDIS_URL?.split(":")[0],
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
  },
};

export default QUEUE_CONFIG;
