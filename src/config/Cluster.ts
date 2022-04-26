import * as cluster from "cluster";
import * as os from "os";
import App from "./App";

const numCPUs = process.env.CPUS_TO_USE || os.cpus().length;
console.log("NUM CPUS", numCPUs);

class AppClusterService {
  private static isMaster(): boolean {
    return (cluster as any).isMaster;
  }

  private static logRestarting(worker: any): void {
    console.log(`Worker ${worker.process.pid} died. Restarting`);
  }

  private static generateAFork(): void {
    (cluster as any).fork();
  }

  private static masterProcess(): void {
    for (let cpu = 0; cpu < numCPUs; cpu++) {
      this.generateAFork();
    }
    (cluster as any).on("exit", (worker: any) => {
      this.logRestarting(worker);
      this.generateAFork();
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static clusterize(APP: App): void {
    if (this.isMaster()) return this.masterProcess();

    APP.start();
  }
}

export default AppClusterService;
