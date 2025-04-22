const { spawn } = require("child_process");

function runPython() {
  return new Promise((resolve, reject) => {
    const python = spawn("python3", ["news_script.py"]);
    let data = "";
    let errorOutput = "";

    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (err) => {
      errorOutput += err.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        console.error("Python Error:", errorOutput);
        return reject("Python script failed: " + errorOutput);
      }
      try {
        const result = JSON.parse(data);
        console.log("Python Result:", result);  // To view successful result
        resolve(result);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        console.error("Raw Output:", data);
        reject("Invalid JSON from Python script");
      }
    });
  });
}

module.exports = runPython;
