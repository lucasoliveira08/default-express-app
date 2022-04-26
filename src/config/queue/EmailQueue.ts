import Queue = require("bull");
import QUEUE_CONFIG from "./config";
import QueueUtils from "./UtilsQueue";

class EmailQueue extends QueueUtils {
  private queue: Queue.Queue;

  constructor() {
    super();

    this.queue = new Queue("email-queue", QUEUE_CONFIG);

    this.queue.process(this.proccess);

    this.queue.on("completed", this.completed);
    this.queue.on("active", this.active);
    this.queue.on("failed", this.failed);
    this.queue.on("error", this.error);
  }

  private async proccess(
    job: Queue.Job,
    done: Queue.DoneCallback
  ): Promise<void> {
    try {
      done();
    } catch (error) {
      job.moveToFailed({
        message: `Job failed: \n\n ${JSON.stringify(error)}`,
      });
    }
  }

  public add(data: any, options?: Queue.JobOptions): void {
    this.queue.add(data, { ...this.defaultOptions, ...options });
  }
}

export default new EmailQueue();
