import Queue = require("bull");
import QUEUE_CONFIG from "../config/queue.config";
import QueueUtils from "./UtilsQueue";
import * as sgMail from "@sendgrid/mail";
import "dotenv/config";

interface MailInterface {
  to: string;
  subject: string;
  text: string;
  html: string;
}

class EmailQueue extends QueueUtils {
  private queue: Queue.Queue;

  constructor() {
    super();

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      await sgMail
        .send({ ...job.data, from: process.env.SEND_GRID_VALID_EMAIL })
        .then((response) => {
          done(null, response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      job.moveToFailed({
        message: `Job failed: \n\n ${JSON.stringify(error)}`,
      });
    }
  }

  public add(data: MailInterface, options?: Queue.JobOptions): void {
    this.queue.add(data, { ...this.defaultOptions, ...options });
  }
}

export default new EmailQueue();
