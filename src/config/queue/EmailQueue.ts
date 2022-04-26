import Queue from "bull";
import BullQueue from "./Queue";

class EmailQueue extends BullQueue {
  private queue: Queue.Queue;
  constructor() {
    super();

    this.queue = this.createQueue("email");
    this.queue.process(this.proccess);
    this.queue.on("completed", this.completed);
  }

  private completed(job: Queue.Job, result: any): void {
    console.log("Job completed with result", result);
  }

  private async proccess(
    job: Queue.Job,
    done: Queue.DoneCallback
  ): Promise<void> {
    console.log(job.data);

    done();
  }

  public async add(data: any): Promise<void> {
    await this.queue.add(data);
  }
}

export default new EmailQueue();
