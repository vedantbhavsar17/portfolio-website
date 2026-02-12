// Kaggle Data Integration
const KAGGLE_DATA_URL = 'kaggle-data.json';
const KAGGLE_CONTAINER_ID = 'kaggle-content';

async function fetchKaggleData() {
    const container = document.getElementById(KAGGLE_CONTAINER_ID);
    if (!container) return;

    try {
        const response = await fetch(KAGGLE_DATA_URL);
        if (!response.ok) throw new Error('Failed to load Kaggle data');

        const data = await response.json();
        renderKaggleSection(data);
    } catch (error) {
        console.error('Error loading Kaggle data:', error);
        container.innerHTML = '<p class="error-msg">Failed to load Kaggle profile data.</p>';
    }
}

function renderKaggleSection(data) {
    const container = document.getElementById(KAGGLE_CONTAINER_ID);

    // Header with Stats
    let html = `
        <div class="kaggle-header animate-up">
            <div class="kaggle-profile">
                <i class="fab fa-kaggle kaggle-logo"></i>
                <div class="kaggle-info">
                    <h3>${data.username}</h3>
                    <span class="kaggle-rank">${data.rank}</span>
                </div>
            </div>
            <div class="kaggle-stats-grid">
                <div class="k-stat">
                    <span class="k-num">${data.stats.competitions}</span>
                    <span class="k-label">Comps</span>
                </div>
                <div class="k-stat">
                    <span class="k-num">${data.stats.notebooks}</span>
                    <span class="k-label">Code</span>
                </div>
                <div class="k-stat">
                    <span class="k-num">${data.stats.discussions}</span>
                    <span class="k-label">Discuss</span>
                </div>
            </div>
        </div>
    `;

    // Notebooks Grid - Using GitHub-like Card Style
    html += `<h4 class="k-sub-title animate-up delay-1">Top Kernels & Notebooks</h4>`;
    html += `<div class="kaggle-notebooks-grid">`;

    data.notebooks_list.forEach((nb, index) => {
        const medalIcon = nb.medal
            ? `<span class="k-medal medal-${nb.medal}"><i class="fas fa-medal"></i></span>`
            : '';

        html += `
            <div class="kaggle-card animate-up" style="animation-delay: ${0.2 + (index * 0.1)}s">
                <div class="k-card-header">
                    <a href="${nb.url}" target="_blank" class="k-link"><h5><i class="fas fa-book-open"></i> ${nb.title}</h5></a>
                    <div class="k-votes">
                        ${medalIcon}
                        <span><i class="fas fa-arrow-up"></i> ${nb.votes}</span>
                    </div>
                </div>
                <p class="k-desc">${nb.description}</p>
                <div class="k-footer">
                    <div class="k-tools">
                         ${nb.tools.map(t => `<span class="language"><i class="fas fa-circle" style="font-size: 6px; color: #20BEFF;"></i> ${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    });
    html += `</div>`;

    // Competitions Section
    html += `<h4 class="k-sub-title animate-up delay-2">Recent Competitions</h4>`;
    html += `<div class="kaggle-comps-list animate-up delay-3">`;

    data.competitions_list.forEach(comp => {
        html += `
            <div class="comp-item glass-card">
                <span class="comp-name">${comp.name}</span>
                <span class="comp-rank">${comp.rank}</span>
            </div>
        `;
    });
    html += `</div>`;

    html += `<div class="kaggle-cta animate-up delay-3">
                <a href="${data.profileUrl}" target="_blank" class="btn btn-primary k-main-btn"><i class="fab fa-kaggle"></i> View Full Profile</a>
             </div>`;

    container.innerHTML = html;
}

// Expose to global scope
window.fetchKaggleData = fetchKaggleData;
