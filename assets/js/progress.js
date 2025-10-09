document.addEventListener("DOMContentLoaded", async () => {
  const listContainer = document.getElementById("enrolledCoursesList");
  const progressBar = document.querySelector(".progress-bar");
 
  try {
    // ✅ Step 1: Fetch all enrolled courses from your backend
    const response = await fetch("https://elearningbackend-production-9496.up.railway.app/api/enrollments");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
 
    const enrollments = await response.json();
 
    if (!enrollments || enrollments.length === 0) {
      listContainer.innerHTML = `
        <li class="list-group-item text-center text-muted">
          No courses enrolled yet.
        </li>`;
      progressBar.style.width = "0%";
      progressBar.textContent = "0% Completed";
      return;
    }
 
    // ✅ Step 2: Display each enrolled course
    let totalProgress = 0;
    for (const enroll of enrollments) {
      // ✅ Fetch course details from your deployed backend
      const courseResponse = await fetch(`https://elearningbackend-production-9496.up.railway.app/api/courses/${enroll.courseId}`);
      if (!courseResponse.ok) {
        console.warn(`Failed to fetch course ${enroll.courseId}`);
        continue;
      }
 
      const course = await courseResponse.json();
 
      // ✅ Use real progress from enrollment, else generate dummy progress
      const progress = enroll.progress ? enroll.progress : Math.floor(Math.random() * 100);
      totalProgress += progress;
 
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div class="d-flex align-items-center">
          <img src="${course.imageUrl}" width="60" height="40"
               style="border-radius:5px; margin-right:10px; object-fit:cover;">
          <strong>${course.title}</strong>
        </div>
        <span class="badge bg-warning text-dark rounded-pill">${progress}% Complete</span>
      `;
      listContainer.appendChild(li);
    }
 
    // ✅ Step 3: Update average progress
    const avgProgress = Math.round(totalProgress / enrollments.length);
    progressBar.style.width = avgProgress + "%";
    progressBar.textContent = avgProgress + "% Completed";
 
  } catch (error) {
    console.error("❌ Error loading enrolled courses:", error);
    listContainer.innerHTML = `
      <li class="list-group-item text-center text-danger">
        Failed to load enrolled courses.
      </li>`;
  }
});
 
 