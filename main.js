
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

document.addEventListener("DOMContentLoaded", initPXT, { once: true });
