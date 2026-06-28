const VALID_ID = "3538273";
const MAP_URL = "https://maps.app.goo.gl/K8W7C17oAxzBCyS6A?g_st=ic";

const startJourneyBtn = document.getElementById("startJourneyBtn");
const locationStatus = document.getElementById("locationStatus");
const confirmBtn = document.getElementById("confirmBtn");
const idNumber = document.getElementById("idNumber");
const messageBox = document.getElementById("messageBox");
const trafficBtn = document.getElementById("trafficBtn");
const trafficSection = document.getElementById("trafficSection");

let userLocation = null;

function setStatus(element, text, type = "") {
  element.textContent = text;
  element.className = element === locationStatus ? "status-box" : "message-box";
  if (type) element.classList.add(type);
}

startJourneyBtn.addEventListener("click", () => {
  messageBox.textContent = "";

  if (!navigator.geolocation) {
    setStatus(locationStatus, "আপনার ব্রাউজারে লোকেশন সাপোর্ট নেই।", "error");
    return;
  }

  setStatus(locationStatus, "লোকেশন নেওয়া হচ্ছে... ব্রাউজারের permission Allow করুন।", "warning");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

      setStatus(
        locationStatus,
        `লোকেশন নেওয়া হয়েছে। Latitude: ${userLocation.latitude.toFixed(5)}, Longitude: ${userLocation.longitude.toFixed(5)}`,
        "success"
      );
    },
    (error) => {
      let text = "লোকেশন নেওয়া যায়নি। আবার চেষ্টা করুন।";
      if (error.code === error.PERMISSION_DENIED) {
        text = "লোকেশন permission বন্ধ করা হয়েছে। ব্রাউজার থেকে Allow করে আবার চেষ্টা করুন।";
      }
      setStatus(locationStatus, text, "error");
    },
    {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0
    }
  );
});

confirmBtn.addEventListener("click", () => {
  const givenId = idNumber.value.trim();

  if (givenId === VALID_ID) {
    setStatus(messageBox, "আইডি কনফার্ম হয়েছে। ম্যাপে নিয়ে যাওয়া হচ্ছে...", "success");
    setTimeout(() => {
      window.location.href = MAP_URL;
    }, 700);
  } else {
    setStatus(messageBox, "আপনি রেজিস্ট্রারড নন", "error");
    idNumber.focus();
  }
});

idNumber.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    confirmBtn.click();
  }
});

trafficBtn.addEventListener("click", () => {
  const isHidden = trafficSection.hasAttribute("hidden");

  if (isHidden) {
    trafficSection.removeAttribute("hidden");
    trafficBtn.textContent = "নিকটস্থ ট্রাফিক তালিকা বন্ধ করুন";
    trafficSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } else {
    trafficSection.setAttribute("hidden", "");
    trafficBtn.textContent = "নিকটস্থ ট্রাফিক যোগাযোগ";
  }
});
