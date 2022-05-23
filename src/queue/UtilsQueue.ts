import Queue = require("bull");
import "dotenv/config";

const LOG_JOBS = process.env.NODE_ENV === "development";

class QueueUtils {
  protected defaultOptions: Queue.JobOptions = {
    attempts: 3,
    delay: 0,
    priority: 1,
    removeOnComplete: true,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  };

  protected failed(job: Queue.Job, error: any): void {
    LOG_JOBS && console.log("Job failed", job.data, error);
  }

  protected error(job: Queue.Job, error: any): void {
    LOG_JOBS && console.log("Job error", job.data, error);
  }

  protected completed(job: Queue.Job, result: any): void {
    LOG_JOBS && console.log("Job completed with result", job.data, result);
  }

  protected active(job: Queue.Job): void {
    LOG_JOBS && console.log("Job active", job.data);
  }
}

export default QueueUtils;
