import { createClient, RedisClientType } from "redis";

class Redis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD,
    });

    this.connect();
  }

  public async set(key: string, value: string): Promise<void> {
    await this.getClient().set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this.getClient().get(key);
  }

  public async del(key: string): Promise<void> {
    await this.getClient().del(key);
  }

  public async lRange(key: string, start: number, end: number): Promise<any> {
    return await this.getClient().lRange(key, start, end);
  }

  public async lPush(key: string, value: string): Promise<void> {
    await this.getClient().lPush(key, value);
  }

  public async lPop(key: string): Promise<void> {
    await this.getClient().lPop(key);
  }

  public async lLen(key: string): Promise<void> {
    await this.getClient().lLen(key);
  }

  private async connect(): Promise<void> {
    await this.getClient().connect();
  }

  private getClient(): RedisClientType {
    return this.client;
  }
}

export default new Redis();
