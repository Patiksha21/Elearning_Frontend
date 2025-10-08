// ✅ logout.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
 
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Clear user session
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
 
      alert("👋 You have been logged out!");
 
      // Hide logout button
      logoutBtn.style.display = "none";
 
      // Optional: redirect to login page
      window.location.href = "login.html";
    });
  }
});
 