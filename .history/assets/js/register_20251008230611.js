document.querySelector("#register-form form").addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const fullName = document.getElementById("regFullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const confirmPassword = document.getElementById("regConfirmPassword").value.trim();
  const gender = document.getElementById("regGender").value;
  const dob = document.getElementById("regDob").value;
  const mobile = document.getElementById("regMobile").value.trim();
 
  if (password !== confirmPassword) {
    alert("Passwords do not match ❌");
    return;
  }
 
  const userData = { fullName, email, password, gender, dob, mobile };
 
  try {
    const response = await fetch("api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
 
    if (response.ok) {
      alert("Registration successful ✅ Now you can login");
      showLogin(); // Switch back to login form
    } else {
      const errorText = await response.text();
      alert("Error: " + errorText);
    }
  } catch (err) {
    console.error("Registration failed:", err);
    alert("Server not reachable ⚠️");
  }
});
 