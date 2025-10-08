// All 10 Courses with 4 Lectures each
const courses = [
  {
    title: "Web Development Bootcamp",
    lectures: [
      { video: "https://www.youtube.com/embed/l1EssrLxt7E", desc: "Introduction to Web Development" },
      { video: "https://www.youtube.com/embed/UB1O30fR-EE", desc: "HTML Basics for Beginners" },
      { video: "https://www.youtube.com/embed/yfoY53QXEnI", desc: "CSS Crash Course" },
      { video: "https://www.youtube.com/embed/W6NZfCO5SIk", desc: "JavaScript Basics Explained" }
    ]
  },
  {
    title: "Python For Beginners",
    lectures: [
      { video: "https://www.youtube.com/embed/vLqTf2b6GZw", desc: "Getting Started with Python" },
      { video: "https://www.youtube.com/embed/kqtD5dpn9C8", desc: "Python Variables and Data Types" },
      { video: "https://www.youtube.com/embed/HGOBQPFzWKo", desc: "Loops and Conditions" },
      { video: "https://www.youtube.com/embed/WGJJIrtnfpk", desc: "Functions in Python" }
    ]
  },
  {
    title: "Data Science Essentials",
    lectures: [
      { video: "https://www.youtube.com/embed/xiEC5oFsq2s", desc: "Intro to Data Science" },
      { video: "https://www.youtube.com/embed/-ETQ97mXXF0", desc: "Data Collection and Cleaning" },
      { video: "https://www.youtube.com/embed/xC-c7E5PK0Y", desc: "Data Visualization Basics" },
      { video: "https://www.youtube.com/embed/jNeUBWrrRsQ", desc: "Predictive Modeling" }
    ]
  },
  {
    title: "Digital Marketing Mastery",
    lectures: [
      { video: "https://www.youtube.com/embed/kunkYTKFNtI", desc: "Intro to Digital Marketing" },
      { video: "https://www.youtube.com/embed/L6N9WnpU9Jc?list=PLXwTOG3-tRwiJmAyVJ47SVvv-dUIy2S0I", desc: "SEO Fundamentals" },
      { video: "https://www.youtube.com/embed/G6DmDqYLWL8?list=PLjVLYmrlmjGcCeELcp2VU66XHlmyoPRpM", desc: "Social Media Marketing" },
      { video: "https://www.youtube.com/embed/OiNms2Muf-0?list=PLjVLYmrlmjGcCeELcp2VU66XHlmyoPRpM", desc: "Email and Content Marketing" }
    ]
  },
  {
    title: "Graphic Design Fundamentals",
    lectures: [
      { video: "https://www.youtube.com/embed/GQS7wPujL2k", desc: "Introduction to Graphic Design" },
      { video: "https://www.youtube.com/embed/nKNubpbBNFc?list=PLK1_9VA534IhRtQJYOtvN92Kb6T6vim7I", desc: "Typography and Color Theory" },
      { video: "https://www.youtube.com/embed/Ib8UBwu3yGA", desc: "Adobe Photoshop Basics" },
      { video: "https://www.youtube.com/embed/WONZVnlam6U?list=PLYfCBK8IplO4E2sXtdKMVpKJZRBEoMvpn", desc: "Creating Visual Layouts" }
    ]
  },
  {
    title: "Cybersecurity Basics",
    lectures: [
      { video: "https://www.youtube.com/embed/lpa8uy4DyMo", desc: "What is Cybersecurity?" },
      { video: "https://www.youtube.com/embed/inWWhr5tnEA", desc: "Types of Cyber Attacks" },
      { video: "https://www.youtube.com/embed/PhYmmD84oFY?list=PLwO5-rumi8A4J7h4Fm92TEC00gfZUk7ls", desc: "Network Security Basics" },
      { video: "https://www.youtube.com/embed/InTFmaWrwCE?list=PLwO5-rumi8A4J7h4Fm92TEC00gfZUk7ls", desc: "Safe Internet Practices" }
    ]
  },
  {
    title: "Machine Learning Basics",
    lectures: [
      { video: "https://www.youtube.com/embed/N5fSpaaxoZc", desc: "Introduction to Machine Learning" },
      { video: "https://www.youtube.com/embed/GwIo3gDZCVQ", desc: "Supervised Learning" },
      { video: "https://www.youtube.com/embed/0Lt9w-BxKFQ", desc: "Unsupervised Learning" },
      { video: "https://www.youtube.com/embed/7eh4d6sabA0", desc: "Regression and Classification" }
    ]
  },
  {
    title: "Cloud Computing with AWS",
    lectures: [
      { video: "https://www.youtube.com/embed/k1RI5locZE4", desc: "Intro to Cloud Computing" },
      { video: "https://www.youtube.com/embed/BSGcQi2WNPg", desc: "AWS Basics and Services" },
      { video: "https://www.youtube.com/embed/3hLmDS179YE", desc: "EC2 and S3 Explained" },
      { video: "https://www.youtube.com/embed/zr48J9Xhaw4?list=PL6XT0grm_TfgtwtwUit305qS-HhDvb4du", desc: "Deploying Apps on AWS" }
    ]
  },
  {
    title: "UI/UX Design Fundamentals",
    lectures: [
      { video: "https://www.youtube.com/embed/Hltyd0MTsZk", desc: "What is UI/UX Design?" },
      { video: "https://www.youtube.com/embed/FlwYtS4mIQw?list=PLdvOfoe7PXT0ouChAnR1nHlT8BJIo5hP_", desc: "Wireframing and Prototyping" },
      { video: "https://www.youtube.com/embed/c9Wg6Cb_YlU", desc: "Design Tools Overview" },
      { video: "https://www.youtube.com/embed/CXIRtrguXFI?list=PL7ZIgV4R67IOMRiW_Q7vZqLulb0xyKDHD", desc: "User Testing and Feedback" }
    ]
  },
  {
    title: "DevOps & CI/CD",
    lectures: [
      { video: "https://www.youtube.com/embed/hQcFE0RD0cQ", desc: "Introduction to DevOps" },
      { video: "https://www.youtube.com/embed/9pZ2xmsSDdo", desc: "Continuous Integration (CI)" },
      { video: "https://www.youtube.com/embed/scEDHsr3APg", desc: "Continuous Deployment (CD)" },
      { video: "https://www.youtube.com/embed/j5Zsa_eOXeY", desc: "Automation Tools in DevOps" }
    ]
  }
];

// Track current course
let currentCourse = 0;

// DOM elements
const lessonsContainer = document.getElementById("lessons-container");
const courseTitle = document.getElementById("course-title");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Function to load a course (4 lectures)
function loadCourse(index) {
  const course = courses[index];
  courseTitle.textContent = course.title;
  lessonsContainer.innerHTML = "";

  course.lectures.forEach((lec, i) => {
    const lecDiv = document.createElement("div");
    lecDiv.classList.add("lecture");

    lecDiv.innerHTML = `
      <h4>Lecture ${i + 1}</h4>
      <iframe width="100%" height="250" src="${lec.video}" frameborder="0" allowfullscreen></iframe>
      <p>${lec.desc}</p>
    `;

    lessonsContainer.appendChild(lecDiv);
  });

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === courses.length - 1;
}

// Button events
prevBtn.addEventListener("click", () => {
  if (currentCourse > 0) {
    currentCourse--;
    loadCourse(currentCourse);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentCourse < courses.length - 1) {
    currentCourse++;
    loadCourse(currentCourse);
  }
});

// Load first course
loadCourse(currentCourse);



// ✅ Select video and progress elements
const video = document.getElementById("lesson-video");
const progressBar = document.getElementById("lesson-progress");

// Get saved progress from localStorage
let savedProgress = localStorage.getItem("videoProgress") || 0;

// When page loads, restore saved progress
video.addEventListener("loadedmetadata", () => {
  const duration = video.duration;
  const currentTime = (savedProgress / 100) * duration;
  video.currentTime = currentTime;
  progressBar.style.width = savedProgress + "%";
  progressBar.textContent = Math.round(savedProgress) + "% Watched";
});

// Update progress as user watches video
video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";
  progressBar.textContent = Math.round(percent) + "% Watched";

  // Save progress in localStorage
  localStorage.setItem("videoProgress", percent);
});

// Reset progress when video ends
video.addEventListener("ended", () => {
  progressBar.style.width = "100%";
  progressBar.textContent = "100% Completed";
  localStorage.setItem("videoProgress", 100);
});


// Example: when video ends
video.addEventListener("ended", () => {
  const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
  const courseTitle = "Full Stack Web Development Bootcamp"; // Replace dynamically if needed
  const updatedCourses = enrolledCourses.map(course => {
    if (course.title === courseTitle) course.progress = 100;
    return course;
  });
  localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
});
