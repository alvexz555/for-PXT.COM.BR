const PXT_CONFIG = {
  refParameter: "ref",
  storageKey: "pxt_ref"
};

/*
 * PXT V1
 * Catálogo exclusivo de fones.
 * Os links de afiliado e imagens ficam centralizados aqui
 * para serem atualizados sem mexer na estrutura da página.
 */
const products = [
  {
    id: "fone-01",
    name: "Fone Bluetooth TWS 3 compatível AirPods, branco",
    use: ["musica", "rotina"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-02",
    name: "Lenovo LE208 Bluetooth sem fio",
    use: ["musica", "rotina", "estudos"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-03",
    name: "Fone sem fio em destaque",
    use: ["musica", "rotina"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-04",
    name: "Fone Bluetooth para o dia a dia",
    use: ["rotina", "estudos"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-05",
    name: "Fone para música e entretenimento",
    use: ["musica"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-06",
    name: "Fone para jogos e imersão",
    use: ["jogos"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-07",
    name: "Fone para estudos e concentração",
    use: ["estudos"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-08",
    name: "Fone sem fio para rotina",
    use: ["rotina"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-09",
    name: "Fone Bluetooth compacto",
    use: ["musica", "rotina"],
    image: "",
    affiliateUrl: ""
  },
  {
    id: "fone-10",
    name: "Fone para uma experiência de áudio completa",
    use: ["musica", "jogos"],
    image: "",
    affiliateUrl: ""
  }
];

function captureRef() {
  try {
    const ref = new URLSearchParams(window.location.search).get(PXT_CONFIG.refParameter);
    if (ref) localStorage.setItem(PXT_CONFIG.storageKey, ref);
  } catch (error) {
    console.warn("[PXT] Não foi possível salvar a origem.", error);
  }
}

function getRef() {
  try {
    return localStorage.getItem(PXT_CONFIG.storageKey) || "direto";
  } catch {
    return "direto";
  }
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const link = document.createElement("a");
  link.className = "product-image-link affiliate-link";
  link.href = product.affiliateUrl || "#";
  link.target = product.affiliateUrl ? "_blank" : "_self";
  link.rel = "noopener noreferrer";
  link.dataset.productId = product.id;
  link.setAttribute("aria-label", `Ver ${product.name}`);

  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";
    link.appendChild(img);
  } else {
    link.innerHTML = `<span class="placeholder-icon">🎧</span><span>Imagem do fone</span>`;
  }

  const info = document.createElement("div");
  info.className = "product-info";
  info.innerHTML = `
    <span class="product-tag">FONE</span>
    <h3>${product.name}</h3>
    <span class="product-action">Ver produto ↗</span>
  `;

  article.append(link, info);
  return article;
}

function renderProducts(list = products) {
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("product-count");
  if (!grid) return;

  grid.innerHTML = "";
  list.forEach(product => grid.appendChild(createProductCard(product)));
  if (count) count.textContent = `${list.length} ${list.length === 1 ? "fone" : "fones"}`;
}

function setupUseFilters() {
  document.querySelectorAll(".use-card").forEach(card => {
    card.addEventListener("click", event => {
      event.preventDefault();
      const use = card.dataset.use;
      const filtered = products.filter(product => product.use.includes(use));
      renderProducts(filtered);
      document.getElementById("fones")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setupTracking() {
  document.addEventListener("click", event => {
    const link = event.target.closest(".affiliate-link");
    if (!link || !link.dataset.productId || !link.href || link.getAttribute("href") === "#") return;
    console.log("[PXT] affiliate_click", {
      ref: getRef(),
      productId: link.dataset.productId,
      timestamp: new Date().toISOString()
    });
  });
}

function initPXT() {
  captureRef();
  renderProducts();
  setupUseFilters();
  setupTracking();
  console.log("[PXT] PXT Fones iniciado. Ref:", getRef());
}

document.addEventListener("DOMContentLoaded", initPXT);
