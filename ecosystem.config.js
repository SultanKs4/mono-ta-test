module.exports = {
    apps: [
        {
            name: "mono-test-api",
            cwd: "build/",
            script: "./server.js",
            instances: "max",
            exec_mode: "cluster",
        },
    ],
}
