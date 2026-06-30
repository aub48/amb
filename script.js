const VALID_ID = "3538273";
const MAP_URL = "https://maps.app.goo.gl/K8W7C17oAxzBCyS6A?g_st=ic";

const startJourneyBtn = document.getElementById("startJourneyBtn");
const locationStatus = document.getElementById("locationStatus");
const confirmBtn = document.getElementById("confirmBtn");
const idNumber = document.getElementById("idNumber");
const messageBox = document.getElementById("messageBox");
const trafficBtn = document.getElementById("trafficBtn");
const trafficSection = document.getElementById("trafficSection");

function setStatus(el, text){
  el.textContent = text;
}

startJourneyBtn.addEventListener("click", () => {
  if(!navigator.geolocation){
    setStatus(locationStatus,"No location support");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos=>{
    setStatus(locationStatus,"Location captured");
  }, err=>{
    setStatus(locationStatus,"Location failed");
  });
});

confirmBtn.addEventListener("click", () => {
  if(idNumber.value.trim() === VALID_ID){
    messageBox.textContent = "OK";
    window.location.href = MAP_URL;
  } else {
    messageBox.textContent = "আপনি রেজিস্ট্রারড নন";
  }
});

trafficBtn.addEventListener("click", () => {
  trafficSection.hidden = !trafficSection.hidden;
});
