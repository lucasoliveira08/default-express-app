import App from "./App";
import * as dotenv from "dotenv";
import AppClusterService from "./Cluster";

dotenv.config();
AppClusterService.clusterize(new App());
