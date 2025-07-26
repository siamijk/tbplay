async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  alert(data.success ? "✅ Login successful" : "❌ Login failed");
}

async function getVideo() {
  const link = document.getElementById("link").value;

  const res = await fetch("/get-video", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });

  const data = await res.json();
  if (data.videoUrl) {
    jwplayer("player").setup({
      file: data.videoUrl,
      width: "100%",
      aspectratio: "16:9",
      autostart: true,
    });
  } else {
    alert("❌ Couldn't fetch video");
  }
}