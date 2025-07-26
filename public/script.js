function isLoggedIn() {
  return document.cookie.includes("loggedIn=true");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email && password) {
    document.cookie = "loggedIn=true; path=/";
    showMain();
  } else {
    alert("Please enter both email and password.");
  }
}

function logout() {
  document.cookie = "loggedIn=; Max-Age=0; path=/";
  location.reload();
}

function showMain() {
  document.getElementById("login").style.display = "none";
  document.getElementById("main").style.display = "block";
}

function play() {
  const link = document.getElementById("videoLink").value;
  const videoUrl = "/api/parse?link=" + encodeURIComponent(link);
  fetch(videoUrl).then(res => res.json()).then(data => {
    if (data.url) {
      jwplayer("player").setup({
        file: data.url,
        width: "100%",
        aspectratio: "16:9"
      });
    } else {
      alert("Failed to parse video link.");
    }
  });
}

window.onload = () => {
  if (isLoggedIn()) {
    showMain();
  } else {
    document.getElementById("login").style.display = "block";
  }
};