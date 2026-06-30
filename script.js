
const validID = "3538273";

document.getElementById("startBtn").addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      ()=>alert("লোকেশন নেওয়া হয়েছে"),
      ()=>alert("লোকেশন অনুমতি দিন")
    );
  }
});

document.getElementById("confirmBtn").addEventListener("click", ()=>{
  const val = document.getElementById("idBox").value.trim();
  const msg = document.getElementById("msg");

  if(val === validID){
    window.location.href = "https://maps.app.goo.gl/K8W7C17oAxzBCyS6A?g_st=ic";
  } else {
    msg.innerText = "আপনি রেজিস্ট্রারড নন";
  }
});

document.getElementById("trafficBtn").addEventListener("click", ()=>{
  document.getElementById("traffic").classList.toggle("hidden");
});
