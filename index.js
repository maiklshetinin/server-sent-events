import express from "express";
import { exec } from "child_process";
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json("Server is working!!!!");

  exec("code", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    // if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    // }
    // console.log(`stdout: ${stdout}`);
  });
});

app.get("/", (req, res) => {
  console.log("Client connected");
  res.setHeader('Content-Type','text/event-stream');
  res.setHeader("Access-Control-Allow-Origin", "*");

  const intervalId = setInterval(() => {
    const date = new Date().toLocaleString();
    res.write(`data: {${date}}\n\n`);
  }, 1000);

  res.on("close", () => {
    console.log("Client closed connection");
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(PORT, () => console.log("server started on " + PORT));
