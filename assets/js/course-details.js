document.addEventListener("DOMContentLoaded", function() {
   
    // =========================================================
    // 1. API FETCHING LOGIC (Course Details & Syllabus)
    // =========================================================
    // const API_BASE = 'http://localhost:8080/api/courses';
    // const ENROLLMENT_API = 'http://localhost:8080/api/enrollments';
 
    const API_BASE = 'https://elearningbackend-production-9496.up.railway.app/api/courses';
    const ENROLLMENT_API = 'https://elearningbackend-production-9496.up.railway.app/api/enrollments';
 
    const contentSection = document.getElementById('dynamic-course-content');
    const noCourseMsg = document.getElementById('no-course-msg');
 
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id'); // Looks for ?id= from courses.html
 
    if (courseId) {
        fetchCourseDetails(courseId);
    } else {
        if (noCourseMsg) noCourseMsg.style.display = 'block';
    }
 
    async function fetchCourseDetails(id) {
        try {
            // Fetch course details and syllabus concurrently
            const [detailResponse, syllabusResponse] = await Promise.all([
                fetch(`${API_BASE}/${id}`),
                fetch(`${API_BASE}/${id}/syllabus`)
            ]);
 
            if (!detailResponse.ok) {
                throw new Error("Course data not found.");
            }
 
            const course = await detailResponse.json();
            // Syllabus fetch is handled gracefully if the API is empty or not 200
            const syllabusTopics = syllabusResponse.ok ? await syllabusResponse.json() : [];
 
            // Populate the dynamic HTML elements
            document.getElementById('detail-title').textContent = course.title;
            document.getElementById('detail-description').textContent = course.description;
            document.getElementById('detail-image').src = course.imageUrl || 'Assets/Images/default.jpg';
           
            const syllabusList = document.getElementById('detail-syllabus-list');
            syllabusList.innerHTML = '';
           
            if (syllabusTopics.length > 0) {
                syllabusTopics.forEach(topic => {
                    const listItem = document.createElement('li');
                    listItem.textContent = topic;
                    syllabusList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = "Syllabus details are currently unavailable.";
                syllabusList.appendChild(listItem);
            }
           
            if (contentSection) contentSection.style.display = 'block';
            if (noCourseMsg) noCourseMsg.style.display = 'none';
            window.scrollTo({ top: 0, behavior: "instant" });
 
        } catch (error) {
            console.error(`Error fetching course ${id}:`, error);
            if (contentSection) contentSection.style.display = 'none';
            if (noCourseMsg) noCourseMsg.style.display = 'block';
        }
    }
 
 
    // =========================================================
    // 2. MODAL LOGIC (Enrollment Form Submission)
    // =========================================================
    const modal = document.getElementById('enrollFormModal');
    const form = document.getElementById('enrollForm');
 
    if (modal && form) {
        // Modal Open/Close Logic
        document.querySelectorAll('a.btn-start').forEach(button => {
            if (button.closest('form')) return;
 
            button.addEventListener('click', function(e) {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });
 
        document.getElementById('closeForm').addEventListener('click', function() {
            modal.style.display = 'none';
        });
 
        window.addEventListener('click', function(e) {
            if (e.target === modal) modal.style.display = 'none';
        });
 
        // Handle form submit (POST /api/enrollments)
        form.addEventListener('submit', async function(e){
            e.preventDefault();
           
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data['courseId'] = courseId;
 
            try {
                const response = await fetch(ENROLLMENT_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
 
                if (!response.ok) {
                    throw new Error(`Server returned status: ${response.status}`);
                }
               
                // 1. Alert the success message
                alert('Enrollment successful! Redirecting to the Progress page.');
               
                // 2. Close the modal (optional, as the page is about to change)
                modal.style.display = 'none';
 
                // 3. *** REDIRECTION TO PROGRESS PAGE ***
                window.location.href = 'progress.html'; // <-- **CHANGED to progress.html**
 
            } catch (error) {
                console.error('Submission Error:', error);
                alert('Error submitting enrollment. Check console and ensure Java server is running and the /api/enrollments mapping is correct.');
            }
        });
    }
});