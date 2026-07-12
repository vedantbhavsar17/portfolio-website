/* ============================================================================
   PORTFOLIO CONTENT — SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   This is the ONLY file you need to edit to update your portfolio content.
   Every page reads from this object and renders itself.

   Legend for the `status` fields you'll see below:
     "live"     -> a real, shipped/verified thing
     "wip"      -> genuinely in progress right now
     "planned"  -> on the roadmap, not started

   ⚠️  Entries marked  // EDIT: example — replace with real data
       are realistic placeholders so the section looks complete.
       They are NOT presented as accomplishments. Swap them for real
       entries (or delete them) whenever you like.
   ============================================================================ */

const DATA = {
  /* ------------------------------------------------------------------ */
  profile: {
    name: "Vedant Harish Bhavsar",
    shortName: "Vedant",
    initials: "VB",
    roles: [
      "AI Engineer",
      "Data Scientist",
      "Machine Learning Engineer",
      "Computer Science Student",
      "Builder",
    ],
    // One-line positioning statement used in the hero.
    tagline:
      "A young engineer obsessed with AI, mathematics, and building intelligent systems.",
    location: "Surat, India",
    education: {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "SDJ International College, Surat",
      status: "In progress",
    },
    email: "bhavsarvedant05@gmail.com",
    resume: "assets/resume.pdf", // place your PDF here
    socials: {
      github: "https://github.com/vedantbhavsar17",
      githubUser: "vedantbhavsar17",
      kaggle: "https://www.kaggle.com/vedantbhavsar43",
      kaggleUser: "vedantbhavsar43",
      linkedin: "https://linkedin.com/in/vedant-bhavsar1",
    },
    // Short bio paragraphs used on the About section.
    bio: [
      "I'm a BCA student from Surat building toward a career as a Machine Learning and AI engineer. My work sits at the intersection of mathematics and code — I care about *why* a model behaves the way it does, not just whether it runs.",
      "Right now I'm building the foundations that production ML is made of: probability and statistics, linear algebra, NumPy/Pandas, and end-to-end model workflows. I implement algorithms like regression and PCA from first principles so the intuition sticks, then wrap them in real interfaces with Flask and Streamlit.",
      "My long-term goal is to build production-grade intelligent systems and pursue higher studies in AI/Data Science. This site is my lab notebook in public — you're watching the progress happen.",
    ],
  },

  /* ------------------------------------------------------------------ */
  // Animated hero / about statistics. Keep these honest.
  stats: [
    { value: 3, suffix: "", label: "ML projects built" },
    { value: 8, suffix: "+", label: "Core skills in progress" },
    { value: 4, suffix: "", label: "Languages (Py, C, C++, SQL)" },
    { value: 2026, suffix: "", label: "Building since", raw: true },
  ],

  /* ------------------------------------------------------------------ */
  // DATA SCIENCE JOURNEY — visual timeline on the home page.
  journey: [
    {
      phase: "01",
      title: "BCA — Computer Science foundations",
      desc: "Programming (Python, C/C++), databases & SQL, and the CS fundamentals that everything else is built on.",
      status: "live",
    },
    {
      phase: "02",
      title: "Mathematics for AI",
      desc: "Linear algebra, probability, statistics, and calculus — the language models actually speak.",
      status: "wip",
    },
    {
      phase: "03",
      title: "Data analysis",
      desc: "NumPy, Pandas, Matplotlib. Cleaning, exploring, and telling the truth with data.",
      status: "wip",
    },
    {
      phase: "04",
      title: "Machine learning",
      desc: "Regression, classification, dimensionality reduction — implemented from scratch, then with scikit-learn.",
      status: "wip",
    },
    {
      phase: "05",
      title: "Deployment & systems",
      desc: "Flask, Streamlit, data engineering, and AI agents — turning notebooks into things people can use.",
      status: "planned",
    },
  ],

  /* ------------------------------------------------------------------ */
  // CURRENT LEARNING — progress bars. Be honest with the percentages;
  // they signal velocity, not mastery.
  learning: [
    { name: "Python", pct: 78, group: "Foundations" },
    { name: "C / C++", pct: 60, group: "Foundations" },
    { name: "SQL", pct: 65, group: "Foundations" },
    { name: "NumPy", pct: 70, group: "Data" },
    { name: "Pandas", pct: 68, group: "Data" },
    { name: "Matplotlib", pct: 62, group: "Data" },
    { name: "Statistics", pct: 55, group: "Mathematics" },
    { name: "Probability", pct: 55, group: "Mathematics" },
    { name: "Linear Algebra", pct: 58, group: "Mathematics" },
    { name: "Machine Learning", pct: 45, group: "ML" },
    { name: "Flask", pct: 50, group: "Deployment" },
    { name: "Streamlit", pct: 52, group: "Deployment" },
  ],

  /* ------------------------------------------------------------------ */
  // SKILLS DASHBOARD — grouped tech. `level` is 1-3 (learning/working/comfortable).
  skills: [
    {
      category: "Languages",
      icon: "code",
      items: [
        { name: "Python", level: 3 },
        { name: "C", level: 2 },
        { name: "C++", level: 2 },
        { name: "SQL", level: 2 },
      ],
    },
    {
      category: "Data & ML",
      icon: "brain",
      items: [
        { name: "NumPy", level: 2 },
        { name: "Pandas", level: 3 },
        { name: "Matplotlib", level: 2 },
        { name: "scikit-learn", level: 2 },
        { name: "EDA", level: 2 },
        { name: "Feature Engineering", level: 2 },
      ],
    },
    {
      category: "Mathematics",
      icon: "sigma",
      items: [
        { name: "Linear Algebra", level: 2 },
        { name: "Probability", level: 2 },
        { name: "Statistics", level: 2 },
        { name: "Optimization", level: 1 },
      ],
    },
    {
      category: "Build & Deploy",
      icon: "rocket",
      items: [
        { name: "Flask", level: 2 },
        { name: "Streamlit", level: 2 },
        { name: "Git / GitHub", level: 2 },
        { name: "Jupyter", level: 3 },
      ],
    },
    {
      category: "Exploring",
      icon: "compass",
      items: [
        { name: "Data Engineering", level: 1 },
        { name: "AI Agents", level: 1 },
        { name: "Automation", level: 1 },
        { name: "MLOps", level: 1 },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  // AI TOOLBOX — the tools you build with, and *how* you use each one.
  // Framed as engineering leverage, not novelty.
  // `logo` matches a key in the LOGO registry (js/core.js). Add more there.
  tools: [
    { name: "Claude Code", logo: "anthropic", use: "Agentic pair-programming in the terminal — building features, refactoring, and debugging entire projects." },
    { name: "ChatGPT / Codex", logo: "openai", use: "Rapid prototyping, generating boilerplate, and exploring multiple approaches before committing." },
    { name: "Claude (claude.ai)", logo: "claude", use: "Explaining ML/math concepts, reviewing my code, and drafting technical notes." },
    { name: "GitHub Copilot", logo: "githubcopilot", use: "Inline autocomplete while writing Python, SQL, and data pipelines." },
    { name: "Jupyter / Colab", logo: "jupyter", use: "Notebook-driven experiments, EDA, and model iteration." },
    { name: "Git & GitHub", logo: "github", use: "Version control, building in public, and open-source workflow." },
  ],

  /* ------------------------------------------------------------------ */
  // EXPERIENCE — only what strengthens the technical profile.
  experience: [
    {
      role: "Development Intern",
      org: "Growthxity",
      period: "2025 – 2026", // EDIT: set your real dates
      status: "live",
      points: [
        "Built and shipped real web projects end-to-end, from requirements to responsive interfaces.",
        "Used AI development tools (Claude Code, ChatGPT, Codex) to accelerate delivery and learn faster.",
        "Practiced production habits: version control, iteration, and shipping working software.",
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  // HACKATHONS — real events, teams, and results.
  hackathons: [
    {
      name: "Hackfluence",
      team: "Leadsflow",
      result: "Top 40 of 1200+ participants",
      year: "2026", // EDIT if the date differs
      status: "live",
      desc: "Competed with team Leadsflow and placed in the top 40 out of 1200+ participants — building and shipping under time pressure.",
      certificate: "assets/hackfluence-certificate-vedant-bhavsar.pdf",
    },
  ],

  /* ------------------------------------------------------------------ */
  // PROJECTS — your 3 real ML projects are live. Add more as you ship.
  // `tags` power the filter buttons on the Projects page.
  projects: [
    {
      title: "Student Score Prediction",
      status: "live",
      year: "2026",
      summary:
        "A predictive model estimating student exam scores from study hours using linear regression, with full preprocessing and correlation visualization.",
      problem:
        "Can a single behavioural signal — hours studied — reliably predict outcomes?",
      approach: [
        "Cleaned and explored the dataset, checked for outliers and correlation.",
        "Fit a linear regression model and interpreted the slope as a real-world effect size.",
        "Visualized the regression line against the data to communicate uncertainty.",
      ],
      result:
        "A working, interpretable baseline — and a clear understanding of when linear assumptions hold.",
      tech: ["Python", "Pandas", "scikit-learn", "Matplotlib"],
      tags: ["Machine Learning", "Regression"],
      repo: "https://github.com/vedantbhavsar17",
      demo: null,
    },
    {
      title: "Lead Admission Prediction",
      status: "live",
      year: "2026",
      summary:
        "A logistic regression classifier predicting the likelihood that a lead converts, focused on feature selection and honest accuracy reporting.",
      problem:
        "Which features actually move conversion, and how confident can the model be?",
      approach: [
        "Ran EDA to understand class balance and feature distributions.",
        "Selected features and trained a logistic regression classifier.",
        "Evaluated with accuracy and reasoned about what the metric hides.",
      ],
      result:
        "A classification baseline plus intuition for probability calibration and metric choice.",
      tech: ["Python", "NumPy", "Logistic Regression", "EDA"],
      tags: ["Machine Learning", "Classification"],
      repo: "https://github.com/vedantbhavsar17",
      demo: null,
    },
    {
      title: "PCA — Implementation & Visualization",
      status: "live",
      year: "2026",
      summary:
        "Principal Component Analysis applied to a high-dimensional dataset, retaining ~95% of variance while making structure visible in 2D.",
      problem:
        "How much of a dataset's signal survives when you compress it — and what does the geometry look like?",
      approach: [
        "Standardized features and computed the covariance structure.",
        "Derived principal components and measured explained variance.",
        "Projected to 2D to reveal clusters and structure.",
      ],
      result:
        "Retained 95% variance in far fewer dimensions; a strong intuition for eigen-decomposition in practice.",
      tech: ["Python", "NumPy", "PCA", "Matplotlib"],
      tags: ["Machine Learning", "Dimensionality Reduction", "Mathematics"],
      repo: "https://github.com/vedantbhavsar17",
      demo: null,
    },
  ],

  /* ------------------------------------------------------------------ */
  // KAGGLE — your public achievements. Kaggle profiles are JS-rendered and
  // can't be auto-scraped without login, so keep these numbers in sync by hand.
  // `tier` per category: Novice | Contributor | Expert | Master | Grandmaster
  kaggle: {
    handle: "vedantbhavsar43",
    name: "Vedant Bhavsar",
    subtitle: "Data Scientist | Python, Pandas",
    headline: "Notebooks Expert",       // top achievement tier
    rank: 949,                           // current Notebooks rank
    highestRank: 948,                    // highest ever
    totalRanked: 62213,                  // out of N ranked users
    // Medal count from your profile (bronze shown). EDIT if it changes.
    medals: { gold: 0, silver: 0, bronze: 9 },
    followers: 12,
    following: 12,
    joined: "10 months ago",
    // Category counts from your profile tabs. `tier` shows only where earned.
    categories: [
      { category: "Notebooks", count: 30, tier: "Expert" },
      { category: "Datasets", count: 7, tier: null },
      { category: "Discussion", count: 106, tier: null },
      { category: "Competitions", count: 1, tier: null },
      { category: "Benchmarks", count: 3, tier: null },
    ],
    // Public-activity heatmap. Kaggle profiles are JS-rendered and can't be
    // fetched live, so this mirrors your profile: the most recent `activeMonths`
    // render dense, older weeks render sparse. Bump `activeMonths` as you stay active.
    activity: { activeMonths: 6, note: "Mirrors kaggle.com/vedantbhavsar43" },
    // Your best public notebooks / datasets (title + url).
    notebooks: [
      { title: "EDA on IPL 2007 to 2026 Complete Ball-by-Ball Dataset", url: "https://www.kaggle.com/datasets/vedantbhavsar43/ipl-2007-to-2026-complete-ball-by-ball-dataset" },
    ],
  },

  /* ------------------------------------------------------------------ */
  // AI LAB — experiments, mini-projects, notebooks, and honest failures.
  // Failures are a FEATURE here. This is what makes the site feel real.
  lab: [
    {
      kind: "experiment",
      title: "Gradient descent, by hand",
      desc: "Implementing gradient descent from scratch to feel how learning rate and convergence actually behave.",
      status: "wip",
      outcome: null,
    },
    {
      kind: "notebook",
      title: "Covariance & correlation, visually",
      desc: "A notebook building intuition for how covariance matrices encode the shape of data.",
      status: "wip",
      outcome: null,
    },
    {
      kind: "failure", // EDIT: example — replace with a real failed attempt (they're great to show)
      title: "Overfit on a tiny dataset",
      desc: "Pushed model complexity too far on a small dataset and watched validation error explode. Lesson logged.",
      status: "live",
      outcome: "Learned: regularization and validation splits are not optional.",
    },
    {
      kind: "mini", // EDIT: example — replace with a real mini-project
      title: "CSV → insight in a Streamlit app",
      desc: "A small Streamlit tool that ingests a CSV and auto-generates an EDA summary.",
      status: "planned",
      outcome: null,
    },
  ],

  /* ------------------------------------------------------------------ */
  // RESEARCH INTERESTS — cards on the Lab page.
  research: [
    {
      title: "Foundations of learning",
      desc: "Why do models generalize? The bias–variance tradeoff, optimization landscapes, and the math underneath.",
    },
    {
      title: "Interpretable ML",
      desc: "Models you can explain. Feature attribution, linear intuition, and honest uncertainty.",
    },
    {
      title: "AI agents & automation",
      desc: "Systems that plan and act — how to make them reliable, not just impressive.",
    },
    {
      title: "Data engineering for ML",
      desc: "Pipelines, quality, and the unglamorous work that decides whether a model ever ships.",
    },
  ],

  /* ------------------------------------------------------------------ */
  // MATH FOR AI — the mathematical spine, shown on the Lab page.
  math: [
    { area: "Linear Algebra", note: "Vectors, matrices, eigen-decomposition — the substrate of every model." },
    { area: "Probability", note: "Distributions, expectation, Bayes — reasoning under uncertainty." },
    { area: "Statistics", note: "Estimation, hypothesis testing, variance — telling signal from noise." },
    { area: "Calculus & Optimization", note: "Gradients and descent — how models actually learn." },
  ],

  /* ------------------------------------------------------------------ */
  // LEARNING LOGS — "what I studied this week". The heartbeat of the site.
  // Add a new entry at the TOP each week. Keep them short and specific.
  logs: [
    {
      week: "2026-W28",
      date: "Jul 2026", // EDIT: example — replace with your real weekly log
      title: "Linear algebra intuition + first PCA",
      studied: ["Eigenvalues & eigenvectors", "Covariance matrices", "Variance explained"],
      concept: "PCA is just choosing the axes your data already prefers.",
      resource: { label: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra" },
      tags: ["Mathematics", "ML"],
    },
    {
      week: "2026-W27",
      date: "Jan 2026", // EDIT: example — replace with your real weekly log
      title: "Pandas group-by and honest EDA",
      studied: ["groupby / agg", "Missing-data strategies", "Correlation heatmaps"],
      concept: "Most 'model' problems are actually data problems in disguise.",
      resource: { label: "Kaggle — Pandas course", url: "https://www.kaggle.com/learn/pandas" },
      tags: ["Data", "Pandas"],
    },
    {
      week: "2026-W26",
      date: "Feb 2026", // EDIT: example — replace with your real weekly log
      title: "Logistic regression & the meaning of accuracy",
      studied: ["Sigmoid & log-loss", "Class imbalance", "Why accuracy lies"],
      concept: "A 95% accurate model can be useless if 95% of the data is one class.",
      resource: { label: "StatQuest — Logistic Regression", url: "https://statquest.org/" },
      tags: ["ML", "Statistics"],
    },
  ],

  /* ------------------------------------------------------------------ */
  // BUILD IN PUBLIC — measurable momentum. GitHub numbers are fetched live;
  // these are the human-scale milestones.
  buildLog: [
    { metric: "Projects shipped", value: 3, note: "3 ML projects, all with source" },
    { metric: "Courses in progress", value: 4, note: "Math, Pandas, ML foundations, SQL" },
    { metric: "Hackathons attended", value: 1, note: "Hackfluence — Top 40 of 1200+" },
    { metric: "New tech this quarter", value: 3, note: "Streamlit, Flask, scikit-learn" },
  ],

  /* ------------------------------------------------------------------ */
  // CERTIFICATES — add real ones as you earn them.
  certificates: [
    {
      title: "Hackfluence Hackathon — Top 40 of 1200+",
      issuer: "Hackfluence · Team Leadsflow",
      year: "2026",
      status: "live",
      url: "assets/hackfluence-certificate-vedant-bhavsar.pdf",
    },
    {
      // EDIT: example — replace with a real certificate or delete
      title: "Python for Data Science",
      issuer: "Self-directed / course platform",
      year: "2026",
      status: "wip",
      url: "https://media.licdn.com/dms/image/sync/v2/D4D27AQFHuPv40RnJWw/articleshare-shrink_480/B4DZpfT_2HGsAo-/0/1762535669563?e=1784440800&v=beta&t=Uswk0Cd5V4NAF0GA9Deuq7KaMe_XcF0J_6Ox3YjOwmo",
    },
  ],

  /* ------------------------------------------------------------------ */
  // BLOG / TECHNICAL NOTES — link out or write in public.
  blog: [
    {
      // EDIT: example — replace with a real post/note or delete
      title: "A Step into Data Visualization in My Machine Learning Journey",
      date: "2025",
      excerpt: " started learning data visualization with Matplotlib. It was my first step into understanding how powerful visuals can be when working with data. Using different graphs and plots helped me discover deeper insights patterns, trends, and relationships that raw numbers couldn’t show.",
      url: "https://medium.com/@bhavsarvedant/a-step-into-data-visualization-in-my-machine-learning-journey-2efe7120a6f9",
      tags: ["Matplotlib", "Pandas", "Data Visualization"],
    },
  ],

  /* ------------------------------------------------------------------ */
  // FUTURE ROADMAP — short / mid / long term.
  roadmap: {
    short: [
      "Master ML foundations (regression, classification, evaluation).",
      "Ship 2 end-to-end projects with a deployed interface.",
      "Solidify linear algebra, probability, and statistics.",
    ],
    mid: [
      "Attend and place in a hackathon.",
      "Make a meaningful open-source contribution.",
      "Land a Data Science / ML internship.",
    ],
    long: [
      "Work as an AI Engineer / Data Scientist building production systems.",
      "Pursue higher studies in AI / Data Science.",
      "Contribute research or tooling the community actually uses.",
    ],
  },

  /* ------------------------------------------------------------------ */
  // TERMINAL — commands available in the on-site terminal (js/terminal.js).
  // These are generated from the data above; nothing to edit here.
};

// Make available to all pages and modules.
window.DATA = DATA;
