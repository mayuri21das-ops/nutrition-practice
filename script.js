document.addEventListener('DOMContentLoaded', function() {
    
    // --- Expandable Sidebar Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if(menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // --- "Read more" / "Get started" button logic ---
    const whyUsBtn = document.getElementById('why-us-btn');
    const whyUsText = document.getElementById('why-us-text');

    // Check if these elements exist on the page (they are only on index.html)
    if (whyUsBtn && whyUsText) {
        whyUsBtn.addEventListener('click', () => {
            // Check if the text is already expanded by looking for the 'expanded' class
            if (whyUsText.classList.contains('expanded')) {
                // If it is expanded, the button says "Get started", so we redirect
                window.location.href = 'page2.html';
            } else {
                // If it is not expanded, add the class to expand the text
                whyUsText.classList.add('expanded');
                // And change the button's text
                whyUsBtn.textContent = 'Get started';
            }
        });
    }

    // --- Packages Pop-up & Slider Logic (for page2.html) ---
    const signupBtn = document.getElementById('signup-btn');
    const packagesPopup = document.getElementById('packages-popup');
    const popupClose = document.getElementById('popup-close');
    const prevBtn = document.getElementById('prev-package');
    const nextBtn = document.getElementById('next-package');
    const packageContainer = document.getElementById('package-container');
    
    // Check if the page 2 elements exist
    if (signupBtn && packagesPopup && popupClose && packageContainer) {
        
        // Popup visibility logic
        signupBtn.addEventListener('click', () => {
            packagesPopup.style.display = 'flex';
        });

        popupClose.addEventListener('click', () => {
            packagesPopup.style.display = 'none';
        });
        
        packagesPopup.addEventListener('click', (e) => {
            if (e.target === packagesPopup) {
                packagesPopup.style.display = 'none';
            }
        });
        
        // Slider logic
        let currentIndex = 0;
        const packages = packageContainer.querySelectorAll('.package-card');
        const totalPackages = packages.length;

        function updateSlider() {
            const offset = -currentIndex * 100;
            // The transform should be on each card for this simple setup
            packages.forEach(card => {
                 card.style.transform = `translateX(${offset}%)`;
            });
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalPackages - 1) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

});