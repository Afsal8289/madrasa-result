<script>
/* ===== CONFIG ===== */
const API = "https://script.google.com/macros/s/AKfycbztlZIheyg4IBQW2_0uSz-x3x7YdITlQda0bYPw8F0b5opY2Jp6cE505SuqN_lgMySb/exec";
const mid = new URLSearchParams(window.location.search).get("mid");

/* ===== SAFETY CHECK ===== */
if(!mid){
  alert("Unauthorized access");
  location.href = "admin.html";
}

/* ===== LOAD SAVED DATA ===== */
fetch(API + "?action=getSettings&mid=" + encodeURIComponent(mid))
  .then(res => res.json())
  .then(data => {
    if (data.madrasa) {
      document.getElementById("madrasaName").value = data.madrasa;
    }
    if (data.mark) {
      document.getElementById("mark").value = data.mark;
    }
  });

/* ===== SAVE MADRASA NAME ===== */
function saveName(){
  const input = document.getElementById("madrasaName");
  const msg = document.getElementById("m1");

  // 🔒 safety check
  if(!input){
    console.error("Input with id 'madrasaName' not found");
    msg.innerText = "Internal error (input missing)";
    return;
  }

  const madrasaName = input.value.trim();

  if(!madrasaName){
    msg.innerText = "മദ്രസയുടെ പേര് നൽകണം";
    return;
  }

  fetch(
    API +
    "?action=saveMadrasa" +
    "&mid=" + encodeURIComponent(mid) +
    "&madrasa=" + encodeURIComponent(madrasaName)
  )
  .then(r => r.json())
  .then(res => {
    msg.innerText = (res.status === "ok")
      ? "മദ്രസയുടെ പേര് സേവ് ചെയ്തു ✔️"
      : "സേവ് ചെയ്യാൻ കഴിഞ്ഞില്ല ❌";
  })
  .catch(() => {
    msg.innerText = "Server error ❌";
  });
}


/* ===== SAVE PASS MARK ===== */
function saveMark(){
  const mark = document.getElementById("mark").value.trim();
  const msg = document.getElementById("m2");

  if(!mark){
    msg.innerText = "പാസ് മാർക്ക് നൽകണം";
    return;
  }

  fetch(
    API +
    "?action=saveMark" +
    "&mid=" + encodeURIComponent(mid) +
    "&mark=" + encodeURIComponent(mark)
  )
  .then(res => res.json())
  .then(res => {
    msg.innerText = (res.status === "ok")
      ? "പാസ് മാർക്ക് സേവ് ചെയ്തു ✔️"
      : "സേവ് ചെയ്യാൻ കഴിഞ്ഞില്ല ❌";
  })
  .catch(() => {
    msg.innerText = "Server error ❌";
  });
}
</script>
