document.addEventListener("DOMContentLoaded", () => {
  const profileModal = document.getElementById("profileModal");
 
  profileModal.addEventListener("show.bs.modal", async (event) => {
    const email = localStorage.getItem("userEmail");
 
    if (!email) {
      event.preventDefault();
      alert("User not logged in ❌ Please log in to view your profile");
      window.location.href = "login.html";
      return;
    }
 
    try {
      const response = await fetch(`https://elearningbackend-production-9496.up.railway.app/api/enrollmentsapi/profile/${encodeURIComponent(email)}`);
 
      if (!response.ok) throw new Error("Failed to fetch profile");
 
      const user = await response.json();
 
      // ✅ Always overwrite content, never append
      document.getElementById("profileName").textContent = user.fullName || "Not available";
      document.getElementById("profileEmail").textContent = user.email || "Not available";
      document.getElementById("profileGender").textContent = user.gender || "Not available";
      document.getElementById("profileDob").textContent = user.dob || "Not available";
      document.getElementById("profileMobile").textContent = user.mobile || "Not available";
 
    } catch (error) {
      console.error("Error loading profile:", error);
      alert("Unable to load profile data ❌");
    }
  });
 
  // Optional: reset fields on modal close
  profileModal.addEventListener("hidden.bs.modal", () => {
    document.getElementById("profileName").textContent = "Loading...";
    document.getElementById("profileEmail").textContent = "Loading...";
    document.getElementById("profileGender").textContent = "Loading...";
    document.getElementById("profileDob").textContent = "Loading...";
    document.getElementById("profileMobile").textContent = "Loading...";
  });
});
 
 