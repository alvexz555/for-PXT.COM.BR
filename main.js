
import { getProducts } from "./catalog/products/index.js";
import { createProductCard } from "./components/product-card.js";
import {
  initTracking,
  captureReferral
} from "./services/tracking.js";

function renderCatalog() {
  const grid = document.querySelector("#products-grid");
  const count = document.querySelector("#catalog-count");

  if (!grid) {
    console.error("[PXT] Elemento #products-grid não encontrado.");
    return;
  }

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

  console.info(`[PXT] ${products.length} produto(s) renderizado(s).`);
}

function initPXT() {
  captureReferral();
  initTracking();
  renderCatalog();

  console.info("[PXT] Sistema iniciado.");
}

const products = [
  {
    id: "fone-01",
    name: "Inova TWS Bluetooth 5.4 Branco",
    description:
      "Fone sem fio com resistência IPX5 anunciada e autonomia anunciada de até 20 horas. Confira os detalhes na oferta.",
    image: "",
    imageAlt: "Fone Inova TWS Bluetooth branco",
    affiliateUrl: "https://meli.la/1CiJWuD"
  },
  {
    id: "fone-02",
    name: "Basike Clip-Ear Bluetooth TWS Preto",
    description:
      "Fone sem fio com design Clip-Ear, indicado para academia e treinos. Confira os detalhes na oferta.",
    image: "",
    imageAlt: "Fone Basike Clip-Ear Bluetooth preto",
    affiliateUrl: "https://meli.la/1bZMGPx"
  },
  {
    id: "fone-03",
    name: "Fone Bluetooth Regulável com Microfone",
    description:
      "Fone Bluetooth com microfone, ajuste regulável e redução de ruído anunciada. Confira os detalhes na oferta.",
    image: "",
    imageAlt: "Fone Bluetooth regulável com microfone",
    affiliateUrl: "https://meli.la/2RJzpx1"
  }


  // ADICIONE NOVOS PRODUTOS ABAIXO.
  // Coloque uma vírgula depois do objeto anterior.
];

export function getProducts() {
  const usedIds = new Set();

  return products.filter(product => {
    if (
      !product ||
      typeof product.id !== "string" ||
      !product.id.trim() ||
      typeof product.name !== "string" ||
      !product.name.trim() ||
      usedIds.has(product.id)
    ) {
      return false;
    }

    usedIds.add(product.id);
    return true;
  });
}

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

  image.addEventListener(
    "error",
    () => {
      area.replaceChildren();
      area.classList.add("image-placeholder");
      area.appendChild(makePlaceholder("Imagem indisponível"));
    },
    { once: true }
  );

  area.appendChild(image);

  return area;
}

function makeAction(product) {
  const action = document.createElement("a");

  action.className = "product-action";
  action.dataset.productId = product.id;

  if (
    typeof product.affiliateUrl === "string" &&
    /^https:\/\/\S+$/i.test(product.affiliateUrl)
  ) {
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

let trackingInitialized = false;

export function captureReferral() {
  try {
    const url = new URL(window.location.href);
    const ref = url.searchParams.get(REF_PARAMETER);

    if (ref && /^[a-zA-Z0-9_-]{1,60}$/.test(ref)) {
      window.localStorage.setItem(STORAGE_KEY, ref);

      console.info("[PXT] Origem registrada:", ref);
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
  if (trackingInitialized) return;

  trackingInitialized = true;

  document.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const link = target.closest("a.affiliate-link");

    if (!link || !link.dataset.productId) return;

    console.info("[PXT] affiliate_click", {
      ref: getReferral(),
      productId: link.dataset.productId,
      timestamp: new Date().toISOString()
    });
  });
}

  {
    id: "fone-03",
    name: "Nome do novo fone",
    description: "Descrição curta do produto.",
    image: "",
    imageAlt: "Descrição da imagem do produto",
    affiliateUrl: "COLE_O_LINK_AQUI"
  }


document.addEventListener("DOMContentLoaded", initPXT, { once: true });
