document.addEventListener('DOMContentLoaded', function() {

    // Helper function to load HTML content into a section
    const loadSection = (sectionId, filePath) => {
        const container = document.getElementById(sectionId);
        if (container) {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Could not load ${filePath}`);
                    }
                    return response.text();
                })
                .then(data => {
                    container.innerHTML = data;
                })
                .catch(error => console.error(`Error loading section: ${error}`));
        }
    };

    // --- 1. Load All Modular HTML Sections ---
    loadSection('why-us', 'why-us-section.html');
    loadSection('about-programme', 'about-programme-section.html');
    loadSection('how-it-works', 'how-it-works-section.html');
    loadSection('packages', 'packages-section.html');
    loadSection('footer', 'footer.html');


    // --- 2. Expandable Sidebar Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        // Close sidebar when a link is clicked
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        });
    }


    // --- 3. Floating Section Navigation Logic ---
    const upArrow = document.getElementById('prev-section');
    const downArrow = document.getElementById('next-section');

    // Define all scrollable sections in order
    const sections = Array.from(document.querySelectorAll('main > section'));
    let currentSectionIndex = 0;

    // Function to update arrow visibility
    const updateNavVisibility = () => {
        // Hide up arrow on the first section
        upArrow.classList.toggle('hidden', currentSectionIndex === 0);
        // Hide down arrow on the last section
        downArrow.classList.toggle('hidden', currentSectionIndex === sections.length - 1);
    };

    // Use IntersectionObserver to detect which section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the index of the currently visible section
                const visibleIndex = sections.findIndex(sec => sec.id === entry.target.id);
                if (visibleIndex !== -1) {
                    currentSectionIndex = visibleIndex;
                    updateNavVisibility();
                }
            }
        });
    }, {
        root: null, // observes intersections relative to the viewport
        threshold: 0.5 // triggers when 50% of the section is visible
    });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Add click listeners for arrows
    downArrow.addEventListener('click', () => {
        if (currentSectionIndex < sections.length - 1) {
            sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    });

    upArrow.addEventListener('click', () => {
        if (currentSectionIndex > 0) {
            sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Initial check to set the correct arrow state on page load
    updateNavVisibility();


        // --- 4. Testimonial Slider Logic ---
    const slidesContainer = document.querySelector('.testimonial-slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('.testimonial-slider .testimonial-card');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        const slideCount = slides.length;
        let currentSlideIndex = 0;
        let slideInterval;

        const showSlide = (index) => {
            // Handle wrap-around
            if (index >= slideCount) {
                index = 0;
            } else if (index < 0) {
                index = slideCount - 1;
            }
            
            const offset = -index * 20;
            slidesContainer.style.transform = `translateX(${offset}%)`;
            currentSlideIndex = index;
        };

        const startSlider = () => {
            slideInterval = setInterval(() => {
                showSlide(currentSlideIndex + 1);
            }, 7000); // 7 seconds
        };

        const resetSliderInterval = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlideIndex + 1);
            resetSliderInterval();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlideIndex - 1);
            resetSliderInterval();
        });

        // Start the automatic rotation
        startSlider();
    }
});