import App from "./App";
import AppClusterService from "./Cluster";

AppClusterService.clusterize(() => new App().start);
