import Queue from "bull";

class BullQueue {
  private queueConfig = {
    redis: {
      host: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD,
      port: Number(process.env.REDIS_PORT),
    },
  };

  protected createQueue(name: string): Queue.Queue {
    return new Queue(name, this.queueConfig);
  }
}

export default BullQueue;
