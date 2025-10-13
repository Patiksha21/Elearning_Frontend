document.addEventListener("DOMContentLoaded", () => {
  const forgotForm = document.querySelector("#forgot-form form");
 
  if (!forgotForm) return;
 
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    const emailInput = forgotForm.querySelector("input[type='email']");
    const email = emailInput.value.trim();
 
    // Simple validation
    if (!email) {
      alert("⚠️ Please enter your registered email address.");
      return;
    }
 
    try {
      // 🔹 Call backend API
      const response = await fetch("https://elearningbackend-production-9496.up.railway.app/api/send-reset", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });
 
      const text = await response.text();
 
      if (response.ok) {
        showPopupMessage(`✅ ${text}`);
        emailInput.value = "";
      } else {
        showPopupMessage(`❌ ${text}`, true);
      }
    } catch (error) {
      console.error("Error:", error);
      showPopupMessage("⚠️ Server not reachable. Please try again later.", true);
    }
  });
 
  // ✅ Helper popup function (same as in login)
  function showPopupMessage(message, isError = false) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = isError ? "#dc3545" : "#28a745";
    popup.style.color = "#fff";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    popup.style.fontWeight = "bold";
    popup.style.zIndex = "9999";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.4s ease";
    document.body.appendChild(popup);
 
    // Fade in
    setTimeout(() => (popup.style.opacity = "1"), 50);
 
    // Fade out & remove
    setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => popup.remove(), 400);
    }, 2000);
  }
});
 