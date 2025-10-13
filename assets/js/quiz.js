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
 
// 🔹 Add Back to Home button dynamically
const backBtn = document.createElement("button");
backBtn.type = "button";
backBtn.className = "btn btn-secondary w-100 mb-3";
backBtn.textContent = "Back to Home";
 
// 🔹 Append buttons
userDetails.appendChild(backBtn);
userDetails.appendChild(startBtn);
 
// 🔹 Back to Home click event
backBtn.addEventListener("click", () => {
  window.location.href = "index.html"; // redirect to home page
});
 
 
  // 🔹 Start Quiz Validation
  startBtn.addEventListener("click", () => {
    const fullName = quizForm.fullName.value.trim();
    const email = quizForm.email.value.trim();
    const mobile = quizForm.mobile.value.trim();
 
    [quizForm.fullName, quizForm.email, quizForm.mobile].forEach(input => {
      input.style.borderColor = "#90c2f3";
    });
 
    let invalidFields = [];
 
    if (!fullName || fullName.length < 2) invalidFields.push(quizForm.fullName);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) invalidFields.push(quizForm.email);
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
 
    userDetails.style.display = "none";
    slides[currentSlide].style.display = "block";
    prevBtn.style.display = "none";
    nextBtn.style.display = slides.length > 1 ? "inline-block" : "none";
    submitBtn.style.display = slides.length === 1 ? "inline-block" : "none";
  });
 
  // 🔹 Correct Answers
  const correctAnswers = {
    q1: "extends", q2: "main()", q3: "String", q4: "Overloading", q5: "final",
    q6: "java.lang", q7: "false", q8: "Map", q9: "friendly", q10: "ArithmeticException",
    q11: "break", q12: "equals()", q13: "All of the above", q14: "Pointer manipulation",
    q15: "new", q16: "+", q17: "start()", q18: "LinkedHashSet", q19: "try-catch", q20: "final"
  };
 
  // 🔹 Show slide and scroll to top
  function showSlide(n) {
    slides.forEach((slide, index) => {
      slide.style.display = index === n ? "block" : "none";
    });
    prevBtn.style.display = n === 0 ? "none" : "inline-block";
    nextBtn.style.display = n === slides.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = n === slides.length - 1 ? "inline-block" : "none";
 
    // 👇 Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
 
  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      showSlide(currentSlide);
    }
  });
 
  nextBtn.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  });
 
  // 🔹 On quiz submit
  quizForm.addEventListener("submit", async (e) => {
    e.preventDefault();
 
    let score = 0;
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;
 
    for (const [q, ans] of Object.entries(correctAnswers)) {
      const userAnswer = quizForm.querySelector(`input[name="${q}"]:checked`);
      if (userAnswer) {
        attempted++;
        if (userAnswer.value === ans) {
          score++;
          correct++;
        } else {
          incorrect++;
        }
      }
    }
 
    // 🧮 Build result summary with bold "Your Score"
    const resultHTML = `
      <h3 style="font-weight: 700;">Your Score: <span style="color: #28a745;">${score} / 20</span></h3>
      <p><strong>Attempted Questions:</strong> ${attempted}</p>
      <p><strong>Correct Answers:</strong> ${correct}</p>
      <p><strong>Incorrect Answers:</strong> ${incorrect}</p>
    `;
 
    scoreValue.innerHTML = resultHTML;
 
    // 🧾 Prepare data for API
    const userData = {
      fullName: quizForm.fullName.value,
      email: quizForm.email.value,
      mobile: quizForm.mobile.value,
      score,
      attempted,
      correct,
      incorrect
    };
 
    // 🔹 Save score
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
 
  // 🔹 Make entire .form-check clickable
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
 
 