document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("healthcareFaqSearchInput");
  const resultsContainer = document.getElementById("healthcareFaqSearchResults");
  const accordion = document.getElementById("healthcareFaqAccordion");
  const MIN_TERM_LENGTH = 2;

  if (!searchInput || !resultsContainer || !accordion) return;

  const faqEntries = Array.from(accordion.querySelectorAll(".accordion-item")).map((item) => {
    const question = item.querySelector(".accordion-button")?.textContent ?? "";
    const answer = item.querySelector(".accordion-body")?.textContent ?? "";
    return {
      element: item,
      content: `${question} ${answer}`.toLowerCase(),
    };
  });

  const articleLinks = [
    {
      title: "Healthcare Dashboard Overview",
      description: "Locate Admin shortcuts for Requirements, Review, Reports, Users, and more.",
      url: "healthcare-articles/healthcare-dashboard.html",
      tags: ["dashboard", "admin", "navigation"],
    },
    {
      title: "Review Student Submissions",
      description: "See when students appear in the Review table and how to process site-specific requirements.",
      url: "healthcare-articles/review-student-submissions.html",
      tags: ["review", "verification", "submissions"],
    },
    {
      title: "Site-Specific Requirements",
      description: "Step-by-step for creating facility requirements using the Forms or Site Orientation categories.",
      url: "healthcare-articles/site-specific-requirements.html",
      tags: ["requirements", "forms", "site orientation"],
    },
    {
      title: "Reports & Clinical Rosters",
      description: "Learn the Passport and Clinical Roster tabs, assignment approvals, and column icons.",
      url: "healthcare-articles/reports-and-rosters.html",
      tags: ["reports", "roster", "icons", "assignments"],
    },
    {
      title: "Manage Healthcare Users",
      description: "Process account requests and maintain active/inactive facility contacts.",
      url: "healthcare-articles/healthcare-users.html",
      tags: ["users", "accounts", "requests"],
    },
  ];

  const renderArticleResults = (term) => {
    const trimmedTerm = term.trim();

    if (trimmedTerm.length < MIN_TERM_LENGTH) {
      resultsContainer.innerHTML =
        '<p class="text-muted small mb-0">Start typing to surface relevant FAQs and suggested guides.</p>';
      return;
    }

    const needle = trimmedTerm.toLowerCase();
    const matches = articleLinks.filter(
      (article) =>
        article.title.toLowerCase().includes(needle) ||
        article.description.toLowerCase().includes(needle) ||
        article.tags.some((tag) => tag.toLowerCase().includes(needle))
    );

    if (!matches.length) {
      resultsContainer.innerHTML =
        '<p class="text-muted small mb-0">No related guides found. Try another keyword.</p>';
      return;
    }

    resultsContainer.innerHTML = matches
      .map(
        (article) => `
        <a class="faq-result-card" href="${article.url}">
          <h3>${article.title}</h3>
          <p class="small">${article.description}</p>
          <div class="faq-result-tags">
            ${article.tags.map((tag) => `<span class="faq-result-tag">${tag}</span>`).join("")}
          </div>
        </a>
      `
      )
      .join("");
  };

  const toggleFaqVisibility = (term) => {
    const normalizedTerm = term.trim().toLowerCase();
    const showAll = normalizedTerm.length < MIN_TERM_LENGTH;

    faqEntries.forEach((entry) => {
      const shouldShow = showAll || entry.content.includes(normalizedTerm);
      entry.element.classList.toggle("faq-match-hidden", !shouldShow);
    });
  };

  searchInput.addEventListener("input", (event) => {
    const term = event.target.value;
    toggleFaqVisibility(term);
    renderArticleResults(term);
  });

  renderArticleResults("");
});
