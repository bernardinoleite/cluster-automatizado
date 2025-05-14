import os, { cpus } from "node:os";
import cluster from "node:cluster";

const runPrimaryProcess = () => {
    const processCout = os.cpus().length * 2
    console.log("Primary ", process.pid, " is running");
    console.log("Forking server with ", processCout, "\n");

    for (let index = 0; index < processCout; index++)
        cluster.fork()

    cluster.on("exit", (worker, code, signal) => {
        if (code != 0 && !worker.exitedAfterDisconnect) {
            console.log("Worker ", worker.process.pid, " died");
            cluster.fork()
        }
    })
}

const runWorkerProcess = async () => {
    await import("./server.js")
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();