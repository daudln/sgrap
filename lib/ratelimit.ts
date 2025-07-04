import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "@/lib/redis";

const opts = {
  points: 6, // 6 points
  duration: 1, // Per second
  storeClient: redisClient,
};

export const limiter = new RateLimiterRedis(opts);

export default limiter;
