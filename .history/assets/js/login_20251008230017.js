document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form form");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileIcon = document.getElementById("profileIcon");
  const loginBtn = document.getElementById("loginBtn");
 
  // 🔹 Function to update UI based on login status
  function updateAuthUI() {
    const isLoggedIn = !!localStorage.getItem("userEmail");
    if (isLoggedIn) {
      logoutBtn.style.display = "block";
      if (loginBtn) loginBtn.style.display = "none";
      if (profileIcon) profileIcon.style.display = "block";
    } else {
      logoutBtn.style.display = "none";
      if (loginBtn) loginBtn.style.display = "block";
      if (profileIcon) profileIcon.style.display = "none";
    }
  }
 
  updateAuthUI();
 
  // 🔹 Login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
 
      const email = document.querySelector("#login-form input[type='email']").value.trim();
      const password = document.querySelector("#login-form input[type='password']").value.trim();
 
      if (!email || !password) {
        alert("⚠️ Please enter both email and password");
        return;
      }
 
      try {
        const response = await fetch("h", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
 
        if (response.ok) {
          const data = await response.json();
 
          // ✅ Store user details in localStorage
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("authToken", data.token || "dummyToken");
          localStorage.removeItem("profileData");
 
          updateAuthUI();
 
          // ✅ Show temporary success message
          showPopupMessage("✅ Login successful!");
 
          // ✅ Redirect after short delay (1.5s)
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        } else {
          alert("❌ Invalid email or password");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("⚠️ Server not reachable. Check if Spring Boot is running.");
      }
    });
  }
 
  // 🔹 Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
      localStorage.removeItem("profileData");
      alert("👋 You have been logged out!");
      updateAuthUI();
    });
  }
 
  // 🔹 Helper function for smooth popup message
  function showPopupMessage(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "#28a745";
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
    }, 1200);
  }
});