// Assets/courses.js - FULL FILE CONTENT
document.addEventListener("DOMContentLoaded", function() {
        
// const COURSE_API_URL = 'http://localhost:8080/api/courses';
const COURSE_API_URL = 'https://elearningbackend-production-9496.up.railway.app/api/courses';

    // This ID must match the courses.html file
    const courseGrid = document.getElementById('dynamic-course-grid'); 

    async function loadCourses() {
        if (!courseGrid) return;
        
        courseGrid.innerHTML = '<p>Loading available courses...</p>';
        
        try {
            const response = await fetch(COURSE_API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const courses = await response.json();
            
            courseGrid.innerHTML = ''; // Clear loading message

            if (courses.length === 0) {
                courseGrid.innerHTML = '<p>No courses are currently published.</p>';
                return;
            }

            // Loop and dynamically create the course cards
            courses.forEach(course => {
                const card = document.createElement('article');
                card.className = 'course-card';
                
                card.innerHTML = `
                    <img src="${course.imageUrl || 'assets/Images/default.jpg'}" alt="${course.title}" />
                    <div class="course-card-body">
                        <h5>${course.title}</h5>
                        <p>${course.description ? course.description.substring(0, 80) : 'No description'}...</p>
                        
                        <a class="btn-enroll" href="course-details.html?id=${course.id}">Enroll Now</a>
                    </div>
                `;
                courseGrid.appendChild(card);
            });

        } catch (error) {
            console.error('Error loading courses:', error);
            courseGrid.innerHTML = '<p style="color: red;">Failed to connect to the backend server. Check the console and ensure the Spring Boot server is running with CORS configured.</p>';
        }
    }

    loadCourses();
});