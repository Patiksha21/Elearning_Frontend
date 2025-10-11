document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".question-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const quizForm = document.getElementById("quizForm");
  const scoreValue = document.getElementById("scoreValue");
  const scoreModalEl = document.getElementById("scoreModal");
  const scoreModal = new bootstrap.Modal(scoreModalEl);
 
  const userDetails = document.querySelector(".user-details");
 
  if (!slides.length || !quizForm || !userDetails) return;
 
  // 🔹 Hide quiz slides and nav buttons initially
  slides.forEach(slide => slide.style.display = "none");
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";
 
  // 🔹 Add Start Quiz button dynamically
  const startBtn = document.createElement("button");
  startBtn.type = "button";
  startBtn.className = "btn btn-primary w-100 mb-3";
  startBtn.textContent = "Start Quiz";
  userDetails.appendChild(startBtn);
 
  // 🔹 On Start Quiz click
  startBtn.addEventListener("click", () => {
    const fullName = quizForm.fullName.value.trim();
    const email = quizForm.email.value.trim();
    const mobile = quizForm.mobile.value.trim();
 
    // Reset previous styles
    [quizForm.fullName, quizForm.email, quizForm.mobile].forEach(input => {
      input.style.borderColor = "#90c2f3";
    });
 
    let invalidFields = [];
 
    // Full Name Validation
    if (!fullName || fullName.length < 2) invalidFields.push(quizForm.fullName);
 
    // Email Validation (must contain @ and .)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) invalidFields.push(quizForm.email);
 
    // Mobile Validation (10 digits only)
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobile || !mobilePattern.test(mobile)) invalidFields.push(quizForm.mobile);
 
    if (invalidFields.length > 0) {
      invalidFields.forEach(input => input.style.borderColor = "red");
      invalidFields[0].focus();
 
      let messages = [];
      if (invalidFields.includes(quizForm.fullName)) messages.push("- Enter a valid full name (at least 2 characters).");
      if (invalidFields.includes(quizForm.email)) messages.push("- Enter a valid email (example@mail.com).");
      if (invalidFields.includes(quizForm.mobile)) messages.push("- Enter a valid 10-digit mobile number.");
 
      alert("⚠️ Please fix the following before starting the quiz:\n" + messages.join("\n"));
      return;
    }
 
    // 🔹 Hide user details, show first quiz slide & navigation
    userDetails.style.display = "none";
    slides[currentSlide].style.display = "block";
    prevBtn.style.display = "none";
    nextBtn.style.display = slides.length > 1 ? "inline-block" : "none";
    submitBtn.style.display = slides.length === 1 ? "inline-block" : "none";
  });
 
  // 🔹 Correct answers
  const correctAnswers = {
    q1: "extends",
    q2: "main()",
    q3: "String",
    q4: "Overloading",
    q5: "final",
    q6: "java.lang",
    q7: "false",
    q8: "Map",
    q9: "friendly",
    q10: "ArithmeticException",
    q11: "break",
    q12: "equals()",
    q13: "All of the above",
    q14: "Pointer manipulation",
    q15: "new",
    q16: "+",
    q17: "start()",
    q18: "LinkedHashSet",
    q19: "try-catch",
    q20: "final"
  };
 
  function showSlide(n) {
    slides.forEach((slide, index) => {
      slide.style.display = index === n ? "block" : "none";
    });
    prevBtn.style.display = n === 0 ? "none" : "inline-block";
    nextBtn.style.display = n === slides.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = n === slides.length - 1 ? "inline-block" : "none";
  }
 
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) { currentSlide--; showSlide(currentSlide); }
  });
 
  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) { currentSlide++; showSlide(currentSlide); }
  });
 
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    let score = 0;
    for (const [q, ans] of Object.entries(correctAnswers)) {
      const userAnswer = quizForm.querySelector(`input[name="${q}"]:checked`);
      if (userAnswer && userAnswer.value === ans) score++;
    }
 
    scoreValue.textContent = `${score} / 20`;
 
    const userData = {
      fullName: quizForm.fullName.value,
      email: quizForm.email.value,
      mobile: quizForm.mobile.value,
      score
    };
 
    try {
      const response = await fetch("https://elearningbackend-production-9496.up.railway.app/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error("Failed to save score");
      console.log("Score saved successfully");
    } catch (err) {
      console.error(err);
    }
 
    scoreModal.show();
  });
 
  // 🔹 Make entire .form-check div clickable
  document.querySelectorAll(".form-check").forEach(option => {
    option.addEventListener("click", (e) => {
      if (e.target.tagName !== "INPUT") {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change'));
        }
      }
    });
  });
 
});
 