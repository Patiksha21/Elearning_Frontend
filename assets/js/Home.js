document.addEventListener("DOMContentLoaded", function() {

    // ======================================================================
    // 1. Mobile Menu Toggle Logic
    // ======================================================================
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ======================================================================
    // 2. Hero Button Handlers (Non-functional as per original code)
    // ======================================================================
    // NOTE: The hero section buttons (.btn-primary, .btn-secondary) were not found
    // in the HTML, so the listeners are kept as-is, assuming their functions 
    // (exploreCourses, enrollNow) are defined elsewhere or for future use.
    const exploreBtn = document.querySelector(".btn-primary");
    const enrollBtn = document.querySelector(".btn-secondary");

    if (exploreBtn) exploreBtn.addEventListener("click", exploreCourses);
    if (enrollBtn) enrollBtn.addEventListener("click", enrollNow);

    // ======================================================================
    // 3. Course Loading Logic
    // ======================================================================
    const COURSE_API_URL = 'https://elearningbackend-production-9496.up.railway.app/api/home/courses';
    const courseGrid = document.getElementById("courses-container"); 

    async function loadCourses() {
        if (!courseGrid) return;
        
        courseGrid.innerHTML = '<p class="text-center text-gray-500">Loading available courses...</p>';
        
        try {
            const response = await fetch(COURSE_API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const courses = await response.json();
            
            courseGrid.innerHTML = ''; // Clear loading message

            if (courses.length === 0) {
                courseGrid.innerHTML = '<p class="text-center text-gray-500">No courses are currently published.</p>';
                return;
            }

            // Loop and dynamically create the course cards (limit to 6)
            courses.slice(0, 6).forEach(course => { 
                
                const card = document.createElement('div');
                
                // --- CARD HEIGHT DECREASED to min-h-[420px] ---
                card.classList.add(
                    "bg-white", "rounded-xl", "shadow-md", "p-4", "flex", "flex-col", 
                    "hover:shadow-lg", "transition", "duration-300", "min-h-[420px]" 
                );
                
                // Truncate description consistently
                const description = course.description
                    ? (course.description.length > 90 ? course.description.substring(0, 90) + "..." : course.description)
                    : "No description available.";

                card.innerHTML = `
                    <div class="h-48 w-full mb-4 overflow-hidden rounded-lg">
                        <img 
                            src="${course.imageUrl || 'assets/images/default-course.jpg'}" 
                            alt="${course.title}" 
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <div class="flex flex-col flex-grow">
                        <h3 class="text-xl font-semibold mb-2">${course.title}</h3>
                        
                        <p class="text-gray-600 text-sm mb-2 flex-grow">${description}</p>
                        
                        <div class="mt-4 flex justify-center w-full">
                            <a 
                                href="course-details.html?id=${course.id}" 
                                class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium text-center max-w-xs"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                `;
                courseGrid.appendChild(card);
            });

        } catch (error) {
            console.error('Error loading courses:', error);
            courseGrid.innerHTML = '<p style="color: red; text-align: center;">Failed to connect to the backend server. Please check the console.</p>';
        }
    }

    loadCourses();

    // ======================================================================
    // 4. Counter Animation Logic for "Our Impact" (stats section)
    // ======================================================================

    /**
     * Handles the counting animation for elements with the 'counter' class 
     * when the 'stats' section scrolls into view.
     */
    function startCounterAnimation(entries, observer) {
        entries.forEach(entry => {
            // Check if the target element (stats section) is visible
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');

                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    let current = 0;
                    const duration = 2000; // 2 seconds
                    const steps = 100;
                    const increment = target / steps;

                    const count = setInterval(() => {
                        current += increment;

                        // Stop the interval and set the final value if target is reached
                        if (current >= target) {
                            clearInterval(count);
                            current = target;
                        }

                        // Special handling for the rating (4.8) to show one decimal and the star
                        if (target === 4.8) {
                            counter.textContent = current.toFixed(1) + '⭐'; 
                        } else {
                            // For integer counts (Students, Courses, Instructors)
                            counter.textContent = Math.floor(current);
                        }
                    }, duration / steps);
                });

                // Once the animation starts, stop observing the section to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }

    // Setup the Intersection Observer for the stats section
    const statsSection = document.getElementById('stats');

    if (statsSection) {
        const observer = new IntersectionObserver(startCounterAnimation, {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // trigger when 50% of the element is visible
        });
        
        // Start observing the stats section
        observer.observe(statsSection);
    }
});