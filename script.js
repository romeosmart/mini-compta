// ===============================
// INITIALISATION
// ===============================

const facturesExemple = [
  {
    date: "2026-02-01",
    nom: "TELMA Madagascar",
    montant: 120000,
    type: "vente",
    description: "Vente d'abonnement internet professionnel.",
  },
  {
    date: "2026-02-02",
    nom: "Orange Money",
    montant: 85000,
    type: "vente",
    description: "Vente de service de paiement mobile.",
  },
  {
    date: "2026-02-03",
    nom: "Starlink",
    montant: 230000,
    type: "achat",
    description: "Achat d'équipement satellite pour connexion internet.",
  },
  {
    date: "2026-02-04",
    nom: "Client Beta",
    montant: 120000,
    type: "achat",
    description: "Achat de fournitures de bureau.",
  },
  {
    date: "2026-02-05",
    nom: "Client Alpha",
    montant: 95000,
    type: "vente",
    description: "Vente de prestation de conseil informatique.",
  },
  {
    date: "2026-02-06",
    nom: "Fournisseur X",
    montant: 50000,
    type: "achat",
    description: "Achat de consommables informatiques.",
  },
  {
    date: "2026-02-07",
    nom: "Client Gamma",
    montant: 175000,
    type: "vente",
    description: "Vente de licence logicielle annuelle.",
  },
  {
    date: "2026-02-08",
    nom: "TELMA Madagascar",
    montant: 200000,
    type: "achat",
    description: "Achat de forfait téléphonique entreprise.",
  },
  {
    date: "2026-02-09",
    nom: "Orange Money",
    montant: 150000,
    type: "vente",
    description: "Vente de service de paiement mobile premium.",
  },
  {
    date: "2026-02-10",
    nom: "Client Delta",
    montant: 130000,
    type: "achat",
    description: "Achat de mobilier de bureau.",
  },
  {
    date: "2026-02-11",
    nom: "Starlink",
    montant: 95000,
    type: "achat",
    description: "Achat d'accessoires réseau.",
  },
  {
    date: "2026-02-12",
    nom: "Client Epsilon",
    montant: 110000,
    type: "vente",
    description: "Vente de prestation de maintenance informatique.",
  },
  {
    date: "2026-02-13",
    nom: "Fournisseur Y",
    montant: 80000,
    type: "achat",
    description: "Achat de fournitures diverses.",
  },
  {
    date: "2026-02-14",
    nom: "Client Zeta",
    montant: 175000,
    type: "vente",
    description: "Vente de solution cloud personnalisée.",
  },
  {
    date: "2026-02-15",
    nom: "TELMA Madagascar",
    montant: 125000,
    type: "achat",
    description: "Achat de routeur professionnel.",
  },
  {
    date: "2026-02-16",
    nom: "Orange Money",
    montant: 90000,
    type: "vente",
    description: "Vente de service de paiement mobile standard.",
  },
  {
    date: "2026-02-17",
    nom: "Client Eta",
    montant: 140000,
    type: "achat",
    description: "Achat de matériel informatique.",
  },
  {
    date: "2026-02-18",
    nom: "Client Theta",
    montant: 160000,
    type: "vente",
    description: "Vente de prestation de développement web.",
  },
  {
    date: "2026-02-19",
    nom: "Starlink",
    montant: 210000,
    type: "achat",
    description: "Achat d'abonnement satellite annuel.",
  },
  {
    date: "2026-02-20",
    nom: "Client Iota",
    montant: 125000,
    type: "vente",
    description: "Vente de prestation de cybersécurité.",
  },
]; // Charger les factures depuis localStorage ou initialiser si vide
let factures = JSON.parse(localStorage.getItem("factures"));
if (!factures || factures.length === 0) {
  factures = facturesExemple;
  localStorage.setItem("factures", JSON.stringify(factures));
}

// ===============================
// FORMAT ARIARY
// ===============================

function formatAr(montant) {
  return montant.toLocaleString("fr-FR") + " Ar";
}

// ===============================
// DARK MODE PERSISTANT
// ===============================

const darkModeBtn = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode"),
    );
  });
}

// ===============================
// AJOUT FACTURE
// ===============================

const btn = document.querySelector(".btn");

if (btn) {
  btn.addEventListener("click", () => {
    const date = document.getElementById("date").value;
    const nom = document.getElementById("nom").value.trim();
    const montant = parseFloat(document.getElementById("montant").value);
    const type = document.getElementById("type").value;
    const description = document.getElementById("description")
      ? document.getElementById("description").value.trim()
      : "";

    if (!date || !nom || isNaN(montant) || montant <= 0) {
      alert("Veuillez remplir correctement tous les champs.");
      return;
    }

    factures.push({ date, nom, montant, type, description });
    localStorage.setItem("factures", JSON.stringify(factures));

    window.location.href = "journal.html";
  });
}

// ===============================
// GENERATION JOURNAL
// ===============================

const journalBody = document.getElementById("journalBody");

if (journalBody) {
  journalBody.innerHTML = "";

  factures.forEach((facture, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${facture.date}</td>
      <td>${facture.nom}</td>
      <td>${facture.type}</td>
      <td>${formatAr(facture.montant)}</td>
      <td>${facture.description && facture.description.trim() !== "" ? facture.description : "-"}</td>
      <td>
        <button class="delete-btn" data-index="${index}">
          Supprimer
        </button>
      </td>
    `;

    journalBody.appendChild(row);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      factures.splice(index, 1);
      localStorage.setItem("factures", JSON.stringify(factures));
      location.reload();
    });
  });
}

// ===============================
// DASHBOARD
// ===============================

const totalAchatsEl = document.getElementById("totalAchats");
const totalVentesEl = document.getElementById("totalVentes");
const resultatEl = document.getElementById("resultat");

if (totalAchatsEl) {
  let totalAchats = 0;
  let totalVentes = 0;

  factures.forEach((f) => {
    if (f.type === "achat") totalAchats += f.montant;
    else totalVentes += f.montant;
  });

  totalAchatsEl.textContent = formatAr(totalAchats);
  totalVentesEl.textContent = formatAr(totalVentes);
  resultatEl.textContent = formatAr(totalVentes - totalAchats);
}

// ===============================
// RECHERCHE
// ===============================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
let inlineSuggestion = "";

if (searchInput) {
  function afficherResultatsRecherche() {
    const query = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";
    inlineSuggestion = "";
    if (!query) return;
    const results = factures.filter(
      (f) =>
        f.nom.toLowerCase().includes(query) ||
        f.type.toLowerCase().includes(query),
    );
    // Inline suggestion (ghost text)
    if (results.length > 0) {
      const first = results[0];
      if (first.nom.toLowerCase().startsWith(query)) {
        inlineSuggestion = first.nom;
        setGhostText(query, inlineSuggestion);
      } else {
        setGhostText(query, "");
      }
    } else {
      setGhostText(query, "");
      const li = document.createElement("li");
      li.textContent = "Aucun résultat trouvé";
      li.style.color = "#888";
      li.style.textAlign = "center";
      searchResults.appendChild(li);
    }
    // Suggestions classiques
    results.forEach((f) => {
      const li = document.createElement("li");
      li.textContent = `${f.date} - ${f.nom} - ${formatAr(f.montant)}`;
      li.tabIndex = 0;
      li.addEventListener("mousedown", () => {
        searchInput.value = f.nom;
        searchResults.innerHTML = "";
        setGhostText(f.nom, "");
      });
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          searchInput.value = f.nom;
          searchResults.innerHTML = "";
          setGhostText(f.nom, "");
          searchInput.focus();
        }
      });
      searchResults.appendChild(li);
    });
  }

  // Ghost text (inline suggestion)
  function setGhostText(query, suggestion) {
    let ghost = document.getElementById("ghostText");
    if (!ghost) {
      ghost = document.createElement("div");
      ghost.id = "ghostText";
      ghost.style.position = "absolute";
      ghost.style.left = searchInput.offsetLeft + "px";
      ghost.style.top = searchInput.offsetTop + "px";
      ghost.style.pointerEvents = "none";
      ghost.style.color = "#bbb";
      ghost.style.fontSize = getComputedStyle(searchInput).fontSize;
      ghost.style.fontFamily = getComputedStyle(searchInput).fontFamily;
      ghost.style.padding = getComputedStyle(searchInput).padding;
      ghost.style.height = searchInput.offsetHeight + "px";
      ghost.style.lineHeight = searchInput.offsetHeight + "px";
      ghost.style.width = searchInput.offsetWidth + "px";
      ghost.style.zIndex = 2;
      ghost.style.background = "transparent";
      ghost.style.whiteSpace = "pre";
      ghost.style.userSelect = "none";
      searchInput.parentNode.style.position = "relative";
      searchInput.parentNode.insertBefore(ghost, searchInput);
    }
    if (suggestion && suggestion.toLowerCase() !== query) {
      ghost.textContent = query + suggestion.slice(query.length);
      ghost.style.display = "block";
    } else {
      ghost.textContent = "";
      ghost.style.display = "none";
    }
  }

  searchInput.addEventListener("input", afficherResultatsRecherche);
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", afficherResultatsRecherche);
  }
  // Inline suggestion accept with Tab or ArrowRight
  searchInput.addEventListener("keydown", (e) => {
    const ghost = document.getElementById("ghostText");
    if (
      (e.key === "Tab" || e.key === "ArrowRight") &&
      inlineSuggestion &&
      ghost &&
      ghost.style.display === "block"
    ) {
      e.preventDefault();
      searchInput.value = inlineSuggestion;
      afficherResultatsRecherche();
      setGhostText(inlineSuggestion, "");
    }
    // Navigation suggestions classiques
    const items = searchResults.querySelectorAll("li");
    if (!items.length) return;
    let idx = Array.from(items).findIndex(
      (li) => li === document.activeElement,
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (idx < items.length - 1) items[idx + 1].focus();
      else items[0].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (idx > 0) items[idx - 1].focus();
      else items[items.length - 1].focus();
    }
  });
  // Cacher suggestions si on clique ailleurs
  document.addEventListener("click", (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.innerHTML = "";
      setGhostText("", "");
    }
  });
}

// ===============================
// EXPORT CSV
// ===============================

const exportCsvBtn = document.getElementById("exportCsv");

if (exportCsvBtn) {
  exportCsvBtn.addEventListener("click", () => {
    let csv = "Date,Nom,Type,Montant,Description\n";

    factures.forEach((f) => {
      csv += `${f.date},${f.nom},${f.type},${f.montant},${f.description ? f.description.replace(/,/g, " ") : ""}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ===============================
// EXPORT PDF
// ===============================

const exportPdfBtn = document.getElementById("exportPdf");

if (exportPdfBtn) {
  exportPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.text("Journal Comptable", 10, y);
    y += 10;

    factures.forEach((f) => {
      doc.text(
        `${f.date} | ${f.nom} | ${f.type} | ${formatAr(f.montant)} | ${f.description ? f.description : "-"}`,
        10,
        y,
      );
      y += 8;
    });

    doc.save("journal.pdf");
  });
}

// ===============================
// IMPORT CSV (CORRIGÉ)
// ===============================

const importCsvInput = document.getElementById("importCsv");

if (importCsvInput) {
  importCsvInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const lines = event.target.result.split("\n").slice(1);

      lines.forEach((line) => {
        if (!line.trim()) return;

        const [date, nom, type, montant, description] = line.split(",");
        factures.push({
          date,
          nom,
          type,
          montant: parseFloat(montant),
          description: description ? description.trim() : "",
        });
      });

      localStorage.setItem("factures", JSON.stringify(factures));
      location.reload();
    };

    reader.readAsText(file);
  });
}

// Compte unique (à personnaliser)
const UNIQUE_USER = {
  username: "admin",
  password: "1234",
};

// Gestion du login obligatoire

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      // Vérification du compte unique
      if (
        username === UNIQUE_USER.username &&
        password === UNIQUE_USER.password
      ) {
        localStorage.setItem("loggedUser", JSON.stringify({ username }));
        window.location.href = "index.html";
      } else {
        alert("Identifiants incorrects. Veuillez réessayer.");
      }
    });
  }
});

// Fonction pour vérifier la connexion sur les autres pages
function checkLogin() {
  const user = localStorage.getItem("loggedUser");
  if (!user) {
    window.location.href = "login.html";
  }
}

// Déconnexion
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
