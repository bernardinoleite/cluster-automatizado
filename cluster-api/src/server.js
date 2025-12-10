import { createServer } from "node:http";
const processId = process.pid


const server = createServer((_, response) => {
    for (let i = 0; i < 1e7; i++);
    response.end("Handled by pid: " + processId);
})

server
    .listen(3000)
    .once("listening", () => {
        console.log("server started in process ", processId);
    })

process.on("SIGINT", (signal) => {
    console.log("server ending", new Date().toISOString());

    server.close(() => {
        process.exit(0)
    })
})

process.on("SIGTERM", (signal) => {
    console.log("server ending", new Date().toISOString());

    server.close(() => {
        process.exit()
    })
})

