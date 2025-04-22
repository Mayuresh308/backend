const { spawn } = require("child_process");

function runPython() {
  return new Promise((resolve, reject) => {
    const python = spawn("C:\\Users\\USER\\AppData\\Local\\Programs\\Python\\Python310\\python.exe", ["news_script.py"]);

    let data = "";

    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) return reject("Python script failed");
      try {
        const result = JSON.parse(data);
        resolve(result);
      } catch (e) {
        reject("Invalid JSON from Python script");
      }
    });
  });
}

module.exports = runPython;
