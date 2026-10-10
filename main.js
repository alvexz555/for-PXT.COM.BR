import { getProducts } from "./catalog/products/index.js";
import { createProductCard } from "./components/product-card.js";
import {
  initTracking,
  captureReferral
} from "./services/tracking.js";

function renderCatalog() {
  const grid = document.querySelector("#products-grid");
  const count = document.querySelector("#catalog-count");

  if (!grid) return;

  const products = getProducts();

  grid.replaceChildren();

  if (products.length === 0) {
    const empty = document.createElement("p");

    empty.className = "empty-catalog";
    empty.textContent =
      "Estamos preparando nossa seleção de fones. Volte em breve.";

    grid.appendChild(empty);
  } else {
    for (const product of products) {
      grid.appendChild(createProductCard(product));
    }
  }

  if (count) {
    count.textContent =
      `${products.length} ${products.length === 1 ? "fone" : "fones"}`;
  }
}

function initPXT() {
  captureReferral();
  renderCatalog();
  initTracking();

  console.info("[PXT] Catálogo iniciado.");
}
import { getProducts } from "./catalog/products/index.js";
import { createProductCard } from "./components/product-card.js";
import {
  initTracking,
  captureReferral
} from "./services/tracking.js";

function renderCatalog() {
  const grid = document.querySelector("#products-grid");
  const count = document.querySelector("#catalog-count");

  if (!grid) return;

  const products = getProducts();

  grid.replaceChildren();

  if (products.length === 0) {
    const empty = document.createElement("p");

    empty.className = "empty-catalog";
    empty.textContent =
      "Estamos preparando nossa seleção de fones. Volte em breve.";

    grid.appendChild(empty);
  } else {
    for (const product of products) {
      grid.appendChild(createProductCard(product));
    }
  }

  if (count) {
    count.textContent =
      `${products.length} ${products.length === 1 ? "fone" : "fones"}`;
  }
}

function initPXT() {
  captureReferral();
  renderCatalog();
  initTracking();

  console.info("[PXT] Catálogo iniciado.");
}

document.addEventListener("DOMContentLoaded", initPXT);
function makePlaceholder(labelText) {
  const wrapper = document.createElement("div");
  wrapper.className = "placeholder-content";

  const icon = document.createElement("span");
  icon.className = "placeholder-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "🎧";

  const label = document.createElement("span");
  label.textContent = labelText;

  wrapper.append(icon, label);

  return wrapper;
}

function makeImageArea(product) {
  const area = document.createElement("div");
  area.className = "product-image-area";

  if (!product.image) {
    area.classList.add("image-placeholder");
    area.appendChild(makePlaceholder("Imagem em preparação"));
    return area;
  }

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.imageAlt || product.name;
  image.loading = "lazy";
  image.decoding = "async";

  image.addEventListener("error", () => {
    area.replaceChildren();
    area.classList.add("image-placeholder");
    area.appendChild(makePlaceholder("Imagem indisponível"));
  }, { once: true });

  area.appendChild(image);

  return area;
}

function makeAction(product) {
  const action = document.createElement("a");

  action.className = "product-action";
  action.dataset.productId = product.id;

  if (product.affiliateUrl) {
    action.href = product.affiliateUrl;
    action.target = "_blank";
    action.rel = "noopener noreferrer sponsored";
    action.classList.add("is-active", "affiliate-link");

    action.textContent = "Ver oferta no Mercado Livre ↗";

    action.setAttribute(
      "aria-label",
      `Ver oferta de ${product.name} no Mercado Livre`
    );
  } else {
    action.href = "#catalogo";
    action.classList.add("is-disabled");
    action.setAttribute("aria-disabled", "true");
    action.tabIndex = -1;

    action.textContent = "Oferta em preparação";
  }

  return action;
}

export function createProductCard(product) {
  const card = document.createElement("article");

  card.className = "product-card";
  card.dataset.productId = product.id;

  const content = document.createElement("div");
  content.className = "product-card-content";

  const tag = document.createElement("span");
  tag.className = "product-tag";
  tag.textContent = "PXT FONES";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const description = document.createElement("p");
  description.textContent =
    product.description ||
    "Confira os detalhes atualizados na página da oferta.";

  content.append(
    tag,
    title,
    description,
    makeAction(product)
  );

  card.append(
    makeImageArea(product),
    content
  );

  return card;
}
const REF_PARAMETER = "ref";
const STORAGE_KEY = "pxt_ref";

export function captureReferral() {
  try {
    const url = new URL(window.location.href);
    const ref = url.searchParams.get(REF_PARAMETER);

    if (ref && /^[a-zA-Z0-9_-]{1,60}$/.test(ref)) {
      window.localStorage.setItem(STORAGE_KEY, ref);
    }
  } catch (error) {
    console.warn(
      "[PXT] Não foi possível salvar a origem do acesso.",
      error
    );
  }
}

function getReferral() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || "direto";
  } catch {
    return "direto";
  }
}

export function initTracking() {
  document.addEventListener("click", event => {
    const link = event.target.closest("a.affiliate-link");

    if (!link || !link.dataset.productId) return;

    console.info("[PXT] affiliate_click", {
      ref: getReferral(),
      productId: link.dataset.productId,
      timestamp: new Date().toISOString()
    });
  });
}
export default {
  id: "fone-01",

  name: "Fone Bluetooth TWS 3 compatível AirPods, branco",

  description:
    "Confira as características e os detalhes na página da oferta.",

  image: "",

  affiliateUrl: ""
};
export default {
  id: "fone-02",

  name: "Lenovo LE208 Bluetooth sem fio",

  description:
    "Confira as características e os detalhes na página da oferta.",

  image: "",

  affiliateUrl: ""
};
import fone01 from "./fone-01.js";
import fone02 from "./fone-02.js";

const products = [
  fone01,
  fone02
];

export function getProducts() {
  return products.filter(product =>
    product &&
    product.id &&
    product.name
  );
}
document.addEventListener("DOMContentLoaded", initPXT);
