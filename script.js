document.addEventListener('DOMContentLoaded', function() {
    
    // --- Expandable Sidebar Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // --- Packages Pop-up Logic (for page2.html) ---
    const signupBtn = document.getElementById('signup-btn');
    const packagesPopup = document.getElementById('packages-popup');
    const popupClose = document.getElementById('popup-close');
    
    // Check if the elements exist on the current page before adding listeners
    if (signupBtn && packagesPopup && popupClose) {
        signupBtn.addEventListener('click', () => {
            packagesPopup.style.display = 'flex';
        });

        popupClose.addEventListener('click', () => {
            packagesPopup.style.display = 'none';
        });
        
        // Close popup if user clicks outside the content area
        packagesPopup.addEventListener('click', (e) => {
            if (e.target === packagesPopup) {
                packagesPopup.style.display = 'none';
            }
        });
    }

    // --- Package Slider Logic ---
    const packageContainer = document.getElementById('package-container');
    const prevBtn = document.getElementById('prev-package');
    const nextBtn = document.getElementById('next-package');
    
    if (packageContainer && prevBtn && nextBtn) {
        let currentIndex = 0;
        const packages = document.querySelectorAll('.package-card');
        const totalPackages = packages.length;

        function updateSlider() {
            const offset = -currentIndex * 100;
            packageContainer.style.transform = `translateX(${offset}%)`;
            // A bit of a hack to make the container itself scroll with the transform
            packages.forEach(pkg => {
                pkg.style.transform = `translateX(${offset}%)`;
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
