document.addEventListener('DOMContentLoaded', function() {
    
    // --- Load "Why Us?" Section from external file ---
    const whyUsContainer = document.getElementById('why-us');
    if (whyUsContainer) {
        fetch('why-us-section.html')
            .then(response => response.text())
            .then(data => {
                whyUsContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading why-us section:', error));
    }

    // --- Load Shared Footer ---
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // --- Expandable Sidebar Logic ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    if(menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
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