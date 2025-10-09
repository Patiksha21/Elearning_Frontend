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
 
  const userDetails = document.querySelector(".user-details"); // 🔹 reference user details div
 
  if (!slides.length || !quizForm) return;
 
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
 
  showSlide(currentSlide);
 
  function showSlide(n) {
    slides.forEach((slide, index) => slide.classList.toggle("active", index === n));
    prevBtn.style.display = n === 0 ? "none" : "inline-block";
    nextBtn.style.display = n === slides.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = n === slides.length - 1 ? "inline-block" : "none";
 
    // 🔹 Show user details only on first slide
    if(userDetails) {
      userDetails.style.display = n === 0 ? "block" : "none";
    }
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
});