// GitHub API Integration
const GITHUB_USERNAME = 'vedantbhavsar17';
const REPO_CONTAINER_ID = 'github-repos';

async function fetchGitHubRepos() {
    const container = document.getElementById(REPO_CONTAINER_ID);
    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('GitHub API request failed');

        const repos = await response.json();

        // Filter for non-forks and valid languages (optional)
        const portfolioRepos = repos
            .filter(repo => !repo.fork && repo.description) // Only show non-forks with descriptions
            .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
            .slice(0, 6); // Take top 6

        displayRepos(portfolioRepos);
        renderContributionHeatmap(); // Placeholder for heatmap
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        container.innerHTML = '<p class="error-msg">Failed to load repositories. Please check connection.</p>';
    }
}

function displayRepos(repos) {
    const container = document.getElementById(REPO_CONTAINER_ID);
    container.innerHTML = ''; // Clear loading state

    repos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'repo-card glass-card animate-up';
        card.style.animationDelay = `${index * 0.1}s`;

        const langColor = getLanguageColor(repo.language);

        card.innerHTML = `
            <div class="repo-header">
                <i class="fab fa-github repo-icon"></i>
                <div class="repo-stats">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
            <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
            <p class="repo-desc">${repo.description || 'No description available.'}</p>
            <div class="repo-meta">
                <span class="repo-lang">
                    <span class="lang-dot" style="background-color: ${langColor}"></span>
                    ${repo.language || 'Code'}
                </span>
                <span class="repo-date">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
        `;

        container.appendChild(card);
    });
}

function getLanguageColor(lang) {
    const colors = {
        'Python': '#3572A5',
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Jupyter Notebook': '#DA5B0B',
        'C++': '#f34b7d'
    };
    return colors[lang] || '#8b9bb4';
}

function renderContributionHeatmap() {
    // Advanced: This would ideally require a proxy or a dedicated library like lightweight-github-heatmap
    // For a static site without backend, we can link to the profile or use an iframe if supported.
    // Here we will inject a link to the profile graph as a simple improved UX.
    const statsSection = document.getElementById('github-stats');
    if (statsSection) {
        // Optional: Add a visual indicator or link to full contribution graph
    }
}

// Expose to global scope
window.fetchGitHubRepos = fetchGitHubRepos;
