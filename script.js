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

    // --- Load Packages Section ---
    const packagesContainer = document.getElementById('packages');
    if (packagesContainer) {
        fetch('packages-section.html')
            .then(response => response.text())
            .then(data => {
                packagesContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading packages section:', error));
    }

});