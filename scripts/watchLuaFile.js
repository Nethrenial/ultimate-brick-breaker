const chokidar = require("chokidar");
const path = require("path");
const childProcess = require("child_process");
const fileName = path.join(__dirname, "..", "dist", "main.lua");

const gameFileWatcher = chokidar.watch(fileName, {});

let process;

gameFileWatcher.on("change", () => {
  if (process) {
    process.kill();
  }
  process = childProcess.spawn("love", ["--console", "dist"]);
});
