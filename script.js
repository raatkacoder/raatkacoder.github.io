let text = "Initializing system...\nConnecting to dark server...\nAccessing RaatKaCoder 😈\n";

let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 40);
  }
}

typeEffect();

function grantAccess() {
  let status = document.getElementById("status");

  status.innerHTML = "Checking credentials...";
  
  setTimeout(() => {
    status.innerHTML = "ACCESS GRANTED 😈";
    status.style.color = "lime";
  }, 1500);
}
