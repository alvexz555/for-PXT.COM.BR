
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

  content.append(tag, title, description, makeAction(product));
  card.append(makeImageArea(product), content);

  return card;
}

