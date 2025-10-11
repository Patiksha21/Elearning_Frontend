document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#register-form form");
  if (!registerForm) return;

  const passwordField = document.getElementById("regPassword");
  const confirmPasswordField = document.getElementById("regConfirmPassword");

  // 🔹 Function to add eye icon for toggle
  function addEyeToggle(input) {
    // Get the original parent to put the new wrapper in its place
    const originalParent = input.parentNode;
    
    // Create a wrapper div for the input and the icon
    const wrapper = document.createElement("div");
    
    // Copy relevant classes/styles from the parent if necessary, 
    // but focus on key positioning styles for the icon overlay.
    wrapper.style.position = "relative"; // Key for positioning the absolute icon
    wrapper.style.display = "flex"; 
    wrapper.style.alignItems = "center";
    wrapper.style.width = "100%"; // Ensure the wrapper takes full width

    // Insert the wrapper *before* the input and then move the input into the wrapper
    originalParent.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    // Ensure the input field inside the wrapper takes up all available width
    input.style.width = "100%"; 
    // Optional: Add padding-right to the input to prevent text from going under the icon
    input.style.paddingRight = "30px"; // Adjust based on icon size

    const eyeIcon = document.createElement("i");
    eyeIcon.className = "fa-solid fa-eye"; // default eye (Requires Font Awesome)
    eyeIcon.style.position = "absolute";
    eyeIcon.style.right = "10px";
    eyeIcon.style.cursor = "pointer";
    eyeIcon.style.userSelect = "none";
    // Center the icon vertically relative to the input box
    eyeIcon.style.top = "50%";
    eyeIcon.style.transform = "translateY(-50%)";

    wrapper.appendChild(eyeIcon);

    eyeIcon.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        eyeIcon.className = "fa-solid fa-eye-slash"; // eye-slash
      } else {
        input.type = "password";
        eyeIcon.className = "fa-solid fa-eye"; // back to normal eye
      }
    });
  }

// ---

  // Apply eye toggle to both fields
  addEyeToggle(passwordField);
  addEyeToggle(confirmPasswordField);

  // 🔹 Inline message elements
  // Note: The inline message elements should typically be added *after* the wrapper
  // to ensure they appear below the input field and its eye toggle wrapper.
  // We need to re-select the new parent (the wrapper) or the original parent
  // and insert the feedback *after* the wrapper.

  // Since the wrapper is now the immediate parent of the input, 
  // we insert the feedback after the *wrapper* element.
  const passwordWrapper = passwordField.parentNode;
  const passwordFeedback = document.createElement("div");
  passwordFeedback.className = "invalid-feedback d-block";
  passwordWrapper.parentNode.insertBefore(passwordFeedback, passwordWrapper.nextSibling);

  const confirmWrapper = confirmPasswordField.parentNode;
  const confirmFeedback = document.createElement("div");
  confirmFeedback.className = "invalid-feedback d-block";
  confirmWrapper.parentNode.insertBefore(confirmFeedback, confirmWrapper.nextSibling);

  // 🔹 Password strength validation
  passwordField.addEventListener("input", () => {
    const password = passwordField.value.trim();
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (password === "") {
      passwordField.setCustomValidity("");
      passwordFeedback.textContent = "";
    } else if (!regex.test(password)) {
      passwordField.setCustomValidity("Weak password");
      passwordFeedback.textContent = "⚠️ Password is weak — must contain lowercase letters, numbers, and special characters.";
      passwordFeedback.style.color = "red";
    } else {
      passwordField.setCustomValidity("");
      passwordFeedback.textContent = "✅ Strong password";
      passwordFeedback.style.color = "green";
    }
  });

  // 🔹 Confirm password validation
  confirmPasswordField.addEventListener("input", () => {
    if (confirmPasswordField.value && confirmPasswordField.value !== passwordField.value) {
      confirmPasswordField.setCustomValidity("Passwords do not match");
      confirmFeedback.textContent = "❌ Passwords do not match";
      confirmFeedback.style.color = "red";
    } else {
      confirmPasswordField.setCustomValidity("");
      confirmFeedback.textContent = "";
    }
  });

  // 🔹 On form submit
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Trigger password field and confirm password field validation on submit
    // to ensure the inline feedback is up-to-date.
    // The 'input' listeners handle the validation, but we can call them manually
    // or rely on the browser's form validity check.
    
    // Manually trigger validation checks for display consistency on submit
    // This ensures the inline messages are shown even if the user hasn't typed recently
    passwordField.dispatchEvent(new Event('input'));
    confirmPasswordField.dispatchEvent(new Event('input'));


    if (!registerForm.checkValidity()) {
      registerForm.reportValidity(); // shows the native browser tooltip
      return;
    }

    const fullName = document.getElementById("regFullName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = passwordField.value.trim();
    const confirmPassword = confirmPasswordField.value.trim();
    const gender = document.getElementById("regGender").value;
    const dob = document.getElementById("regDob").value;
    const mobile = document.getElementById("regMobile").value.trim();

    const userData = { fullName, email, password, gender, dob, mobile };

    try {
      const response = await fetch("https://elearningbackend-production-9496.up.railway.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("✅ Registration successful! You can now log in.");
        showLogin();
      } else {
        const errorText = await response.text();
        alert("❌ Error: " + errorText);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("⚠️ Server not reachable. Check backend connection.");
    }
  });
});