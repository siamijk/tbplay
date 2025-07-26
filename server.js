const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

let sessionCookie = "";

app.use(express.static("public"));
app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginRes = await fetch("https://www.terabox.com/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login_email: email, login_pwd: password }),
    });

    const setCookie = loginRes.headers.get("set-cookie");
    const json = await loginRes.json();

    if (json.errno === 0) {
      sessionCookie = setCookie;
      res.send({ success: true });
    } else {
      res.status(401).send({ error: "Login failed", json });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post("/get-video", async (req, res) => {
  const { link } = req.body;

  try {
    const sharedId = new URL(link).pathname.split("/").pop();
    const fileUrl = `https://terabox-dummy-stream-url/${sharedId}/video.mp4`;

    res.send({ videoUrl: fileUrl });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});