import { Redis } from "ioredis";

export const redisClient = new Redis(process.env.REDIS_URL!, {
  enableOfflineQueue: false,
});

redisClient.on("error", (err) => {
  console.log(err);
});

export default redisClient;
