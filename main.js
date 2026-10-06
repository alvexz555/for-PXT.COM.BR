/* =========================================
   PXT - MAIN.JS
========================================= */


/* =========================================
   CONFIGURAÇÃO
========================================= */

const PXT_CONFIG = {

    /*
     * Chave utilizada na URL.
     *
     * Exemplo:
     * https://seudominio.com/?ref=pacoca01
     */
    refParameter: "ref",

    /*
     * Nome utilizado para guardar a origem
     * durante a navegação do visitante.
     */
    storageKey: "pxt_ref"

};


/* =========================================
   PRODUTOS
========================================= */

const products = [

    {
        id: "produto-01",
        name: "Mouse Gamer RGB",
        category: "Mouses",
        price: "R$ 89,90",
        image: "assets/products/mouse-gamer.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-02",
        name: "Teclado Mecânico RGB",
        category: "Teclados",
        price: "R$ 149,90",
        image: "assets/products/teclado-mecanico.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-03",
        name: "Headset Gamer 7.1",
        category: "Headsets",
        price: "R$ 179,90",
        image: "assets/products/headset-gamer.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-04",
        name: "Mousepad Gamer XXL",
        category: "Acessórios",
        price: "R$ 79,90",
        image: "assets/products/mousepad.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-05",
        name: "Monitor Gamer 24\"",
        category: "Monitores",
        price: "R$ 799,90",
        image: "assets/products/monitor.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-06",
        name: "Microfone USB Gamer",
        category: "Streaming",
        price: "R$ 229,90",
        image: "assets/products/microfone.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-07",
        name: "Webcam Full HD",
        category: "Streaming",
        price: "R$ 159,90",
        image: "assets/products/webcam.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-08",
        name: "Controle Gamer Wireless",
        category: "Controles",
        price: "R$ 199,90",
        image: "assets/products/controle.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-09",
        name: "Suporte para Headset",
        category: "Acessórios",
        price: "R$ 59,90",
        image: "assets/products/suporte-headset.jpg",
        affiliateUrl: "#"
    },

    {
        id: "produto-10",
        name: "Cadeira Gamer",
        category: "Cadeiras",
        price: "R$ 899,90",
        image: "assets/products/cadeira.jpg",
        affiliateUrl: "#"
    }

];


/* =========================================
   ORIGEM DO VISITANTE
========================================= */

function captureRef() {

    const params = new URLSearchParams(window.location.search);

    const ref = params.get(PXT_CONFIG.refParameter);

    if (!ref) {
        return;
    }

    /*
     * Guarda a origem para que ela sobreviva
     * durante a navegação no site.
     */
    localStorage.setItem(
        PXT_CONFIG.storageKey,
        ref
    );

    console.log(
        "[PXT] Origem registrada:",
        ref
    );
}


/* =========================================
   RECUPERAR ORIGEM
========================================= */

function getCurrentRef() {

    return localStorage.getItem(
        PXT_CONFIG.storageKey
    );

}


/* =========================================
   EVENTO DE ACESSO
========================================= */

function trackPageView() {

    const ref = getCurrentRef();

    console.log("[PXT] Page View", {
        ref: ref || "direto",
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });

}


/* =========================================
   CARD DE PRODUTO
========================================= */

function createProductCard(product) {

    const card = document.createElement("article");

    card.className = "product-card";

    card.dataset.productId = product.id;


    /*
     * Espaço reservado para imagem real.
     */
    const image = document.createElement("div");

    image.className = "product-image";

    image.innerHTML = `
        <span>
            IMAGEM DO PRODUTO
        </span>
    `;


    /*
     * Informações do produto.
     */
    const info = document.createElement("div");

    info.className = "product-info";

    info.innerHTML = `

        <span class="product-category">
            ${product.category}
        </span>

        <h3 class="product-name">
            ${product.name}
        </h3>

        <div class="product-price">
            ${product.price}
        </div>

        <a
            href="${product.affiliateUrl}"
            class="product-button affiliate-link"
            data-product-id="${product.id}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Ver produto
        </a>

    `;


    card.appendChild(image);

    card.appendChild(info);

    return card;
}


/* =========================================
   RENDERIZAR PRODUTOS
========================================= */

function renderProducts() {

    const grid = document.getElementById(
        "product-grid"
    );

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    products.forEach(product => {

        const card = createProductCard(product);

        grid.appendChild(card);

    });

}


/* =========================================
   TRACKING DE PRODUTO
========================================= */

function trackProductClick(productId) {

    const ref = getCurrentRef();

    const eventData = {

        event: "affiliate_click",

        ref: ref || "direto",

        productId: productId,

        timestamp: new Date().toISOString()

    };


    /*
     * POR ENQUANTO:
     * apenas observamos no console.
     *
     * FUTURAMENTE:
     * enviar para uma solução real
     * de analytics/tracking.
     */

    console.log(
        "[PXT] Clique afiliado:",
        eventData
    );

}


/* =========================================
   LISTENER DOS LINKS
========================================= */

function setupAffiliateTracking() {

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    ".affiliate-link"
                );

            if (!link) {
                return;
            }

            const productId =
                link.dataset.productId;

            trackProductClick(
                productId
            );

        }
    );

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

function initPXT() {

    captureRef();

    renderProducts();

    trackPageView();

    setupAffiliateTracking();

    console.log(
        "[PXT] Sistema inicializado."
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initPXT
);
