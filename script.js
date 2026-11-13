document.addEventListener('DOMContentLoaded', () => {
    // Render Icons
    lucide.createIcons();

    // Setup Components
    setupThemeSwitcher();
    setupTabControllers();
    setupModuleFilter();
    setupInteractiveModals();
    setupVideoCardToggle();
});

/* 1. Theme and Night Mode Switcher */
function setupThemeSwitcher() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('museum-theme') || 'light';
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-theme') === savedTheme);
    });

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', selectedTheme);
            localStorage.setItem('museum-theme', selectedTheme);

            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

/* 2. Universal Tab Controller */
function setupTabControllers() {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentSection = btn.closest('.module-section');
            const sectionBtns = parentSection.querySelectorAll('.tab-btn');
            const sectionContents = parentSection.querySelectorAll('.academic-content');

            sectionBtns.forEach(b => b.classList.remove('active'));
            sectionContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const selectedTab = btn.getAttribute('data-tab');
            const targetContent = parentSection.querySelector(`#tab-${selectedTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* 3. Module Filter Controller */
function setupModuleFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sections = document.querySelectorAll('.module-section');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            sections.forEach(section => {
                const category = section.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    section.classList.remove('hide');
                } else {
                    section.classList.add('hide');
                }
            });
        });
    });
}

/* 4. Interactive Modal Popup System & Video Modal Trigger */
function setupInteractiveModals() {
    const modal = document.getElementById('infoModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');

    const cards = document.querySelectorAll('.sub-card.clickable');
    const openVideoBtn = document.getElementById('openVideoModalBtn');
    const videoThumbFrame = document.getElementById('videoThumbFrame');

    // Attach click listeners to cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-modal-title');
            const tag = card.getAttribute('data-modal-tag');
            const img = card.getAttribute('data-modal-img');
            const body = card.getAttribute('data-modal-body');
            const link = card.getAttribute('data-modal-link');

            openModal(title, tag, img, body, link);
        });
    });

    // Dedicated Pitch Video Modal Handler
    const triggerVideoModal = () => {
        openModal(
            "Self-Projection Video Pitch (CIE 3)",
            "CIE 3 Deliverable • 60-90s Video",
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
            "In this 90-second self-projection video, I outline my career aspiration as a strategic marketing consultant, my core strengths using the Rule of Three, and how my BBA studies prepare me for real-world impact.",
            "https://youtube.com"
        );
    };

    if (openVideoBtn) openVideoBtn.addEventListener('click', triggerVideoModal);
    if (videoThumbFrame) videoThumbFrame.addEventListener('click', triggerVideoModal);

    function openModal(title, tag, img, body, link) {
        modalTitle.textContent = title || '';
        modalTag.textContent = tag || '';
        modalImg.src = img || '';
        modalDescription.textContent = body || '';

        if (link && link !== '#') {
            modalLink.style.display = 'inline-block';
            modalLink.href = link;
            modalLink.textContent = 'Visit Related Link →';
        } else {
            modalLink.style.display = 'none';
        }

        modal.classList.add('active');
    }

    // Close Modal Events
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

/* 5. Video Card Toggle System */
function setupVideoCardToggle() {
    const previewCard = document.getElementById('videoPreviewCard');
    const playerWrapper = document.getElementById('videoPlayerWrapper');
    const video = document.getElementById('selfVideo');
    const closeBtn = document.getElementById('closeVideoBtn');

    if (previewCard && playerWrapper && video) {
        // Tapping the card hides the preview and plays the video
        previewCard.addEventListener('click', () => {
            previewCard.style.display = 'none';
            playerWrapper.style.display = 'block';
            video.play();
        });

        // Close button to pause video and return to the preview card
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                video.pause();
                video.currentTime = 0;
                playerWrapper.style.display = 'none';
                previewCard.style.display = 'grid'; // Restores grid layout
            });
        }
    }
}