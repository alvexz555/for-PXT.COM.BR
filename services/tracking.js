
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

