const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/parse", (req, res) => {
  const link = req.query.link;
  if (!link) return res.json({ error: "No link provided" });

  // Dummy conversion for testing purposes
  const dummyVideo = "https://cdn.jwplayer.com/manifests/yp34SRmf.m3u8";
  res.json({ url: dummyVideo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));