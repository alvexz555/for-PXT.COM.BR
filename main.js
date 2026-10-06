/* =========================================
   PXT - MAIN.JS
========================================= */


/* =========================================
   CONFIGURAÇÃO
========================================= */

const PXT_CONFIG = {

    /*
     * Parâmetro utilizado na URL.
     *
     * Exemplos:
     *
     * ?ref=fones01
     * ?ref=teclado01
     * ?ref=pacoca01
     */
    refParameter: "ref",

    /*
     * Chave utilizada para manter
     * a origem durante a navegação.
     */
    storageKey: "pxt_ref",

    /*
     * Categoria relacionada a cada origem.
     *
     * O site continua sendo único.
     *
     * O ref apenas muda o contexto
     * inicial da experiência.
     */
    refCategories: {

        fone01: "Headsets",
        fones01: "Headsets",
        headset01: "Headsets",

        teclado01: "Teclados",
        teclados01: "Teclados",

        mouse01: "Mouses",
        mouses01: "Mouses",

        monitor01: "Monitores",
        monitores01: "Monitores",

        cadeira01: "Cadeiras",
        cadeiras01: "Cadeiras",

        streaming01: "Streaming",

        hardware01: "Hardware",

        console01: "Controles",
        controles01: "Controles",

        /*
         * Exemplo de origem externa.
         *
         * Ainda não força uma categoria.
         * Podemos definir o comportamento
         * específico dela depois.
         */
        pacoca01: null

    }

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
   STORAGE SEGURO
========================================= */

function saveRef(ref) {

    try {

        localStorage.setItem(
            PXT_CONFIG.storageKey,
            ref
        );

        return true;

    } catch (error) {

        console.warn(
            "[PXT] Não foi possível salvar a origem.",
            error
        );

        return false;
    }

}


function getStoredRef() {

    try {

        return localStorage.getItem(
            PXT_CONFIG.storageKey
        );

    } catch (error) {

        console.warn(
            "[PXT] Não foi possível recuperar a origem.",
            error
        );

        return null;
    }

}


/* =========================================
   ORIGEM DO VISITANTE
========================================= */

function captureRef() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const ref =
        params.get(
            PXT_CONFIG.refParameter
        );


    /*
     * Nenhuma origem nova.
     *
     * Mantemos a origem anteriormente
     * registrada.
     */
    if (!ref) {

        return getStoredRef();

    }


    /*
     * Normalização:
     *
     * FONE01
     * Fone01
     * fone01
     *
     * passam a ser tratados como:
     *
     * fone01
     */
    const normalizedRef =
        ref.trim().toLowerCase();


    saveRef(normalizedRef);


    console.log(
        "[PXT] Origem registrada:",
        normalizedRef
    );


    return normalizedRef;

}


/* =========================================
   RECUPERAR ORIGEM ATUAL
========================================= */

function getCurrentRef() {

    return getStoredRef();

}


/* =========================================
   IDENTIFICAR CATEGORIA DA ORIGEM
========================================= */

function getCategoryFromRef(ref) {

    if (!ref) {
        return null;
    }


    const category =
        PXT_CONFIG.refCategories[ref];


    if (!category) {

        console.log(
            "[PXT] Origem sem categoria definida:",
            ref
        );

        return null;

    }


    return category;

}


/* =========================================
   ORGANIZAR PRODUTOS
========================================= */

function getOrderedProducts() {

    const ref =
        getCurrentRef();

    const category =
        getCategoryFromRef(ref);


    /*
     * Se não existe categoria associada,
     * mostramos os produtos normalmente.
     */
    if (!category) {

        return [...products];

    }


    /*
     * Produtos da categoria relacionada
     * aparecem primeiro.
     *
     * O restante continua disponível.
     */
    const prioritized =
        products.filter(
            product =>
                product.category === category
        );


    const remaining =
        products.filter(
            product =>
                product.category !== category
        );


    console.log(
        "[PXT] Categoria priorizada:",
        category
    );


    return [
        ...prioritized,
        ...remaining
    ];

}


/* =========================================
   CARD DE PRODUTO
========================================= */

function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    card.dataset.productId =
        product.id;


    /* -----------------------------------------
       IMAGEM
    ----------------------------------------- */

    const image =
        document.createElement("div");

    image.className =
        "product-image";


    /*
     * Se houver caminho de imagem,
     * tentamos carregar a imagem real.
     */
    if (product.image) {

        const img =
            document.createElement("img");

        img.src =
            product.image;

        img.alt =
            product.name;

        img.loading =
            "lazy";


        /*
         * Se a imagem não existir,
         * voltamos para o placeholder.
         */
        img.addEventListener(
            "error",
            function () {

                image.innerHTML = `
                    <span>
                        IMAGEM DO PRODUTO
                    </span>
                `;

            },
            {
                once: true
            }
        );


        image.appendChild(img);

    } else {

        image.innerHTML = `
            <span>
                IMAGEM DO PRODUTO
            </span>
        `;

    }


    /* -----------------------------------------
       INFORMAÇÕES
    ----------------------------------------- */

    const info =
        document.createElement("div");

    info.className =
        "product-info";


    const category =
        document.createElement("span");

    category.className =
        "product-category";

    category.textContent =
        product.category;


    const name =
        document.createElement("h3");

    name.className =
        "product-name";

    name.textContent =
        product.name;


    const price =
        document.createElement("div");

    price.className =
        "product-price";

    price.textContent =
        product.price;


    /* -----------------------------------------
       LINK DE PRODUTO
    ----------------------------------------- */

    const link =
        document.createElement("a");

    link.className =
        "product-button affiliate-link";

    link.dataset.productId =
        product.id;

    link.href =
        product.affiliateUrl || "#";

    link.target =
        "_blank";

    link.rel =
        "noopener noreferrer";

    link.textContent =
        "Ver produto";


    info.appendChild(category);

    info.appendChild(name);

    info.appendChild(price);

    info.appendChild(link);


    card.appendChild(image);

    card.appendChild(info);


    return card;

}


/* =========================================
   RENDERIZAR PRODUTOS
========================================= */

function renderProducts() {

    const grid =
        document.getElementById(
            "product-grid"
        );


    if (!grid) {

        console.warn(
            "[PXT] #product-grid não encontrado."
        );

        return;

    }


    grid.innerHTML = "";


    const orderedProducts =
        getOrderedProducts();


    orderedProducts.forEach(
        product => {

            const card =
                createProductCard(product);

            grid.appendChild(card);

        }
    );


    console.log(
        "[PXT] Produtos renderizados:",
        orderedProducts.length
    );

}


/* =========================================
   CATEGORIA ATIVA
========================================= */

function setActiveCategory(category) {

    const cards =
        document.querySelectorAll(
            ".category-card"
        );


    cards.forEach(card => {

        const cardCategory =
            card.dataset.category;


        /*
         * O HTML usa identificadores
         * em minúsculo.
         *
         * Os produtos usam nomes normais.
         */
        const normalizedCardCategory =
            normalizeCategory(
                cardCategory
            );

        const normalizedCategory =
            normalizeCategory(
                category
            );


        card.classList.toggle(
            "active",
            normalizedCardCategory ===
            normalizedCategory
        );

    });

}


/* =========================================
   NORMALIZAR CATEGORIA
========================================= */

function normalizeCategory(category) {

    if (!category) {
        return "";
    }


    const aliases = {

        headsets: "headsets",
        fones: "headsets",

        teclados: "teclados",

        mouses: "mouses",

        monitores: "monitores",

        cadeiras: "cadeiras",

        streaming: "streaming",

        hardware: "hardware",

        consoles: "controles",
        controles: "controles"

    };


    const normalized =
        category
            .toString()
            .trim()
            .toLowerCase();


    return aliases[normalized] ||
        normalized;

}


/* =========================================
   FILTRAR POR CATEGORIA
========================================= */

function filterProductsByCategory(category) {

    const grid =
        document.getElementById(
            "product-grid"
        );


    if (!grid) {
        return;
    }


    const normalizedCategory =
        normalizeCategory(
            category
        );


    const filteredProducts =
        products.filter(
            product =>
                normalizeCategory(
                    product.category
                ) === normalizedCategory
        );


    /*
     * Se nenhuma categoria for encontrada,
     * não destruímos a grade.
     */
    if (
        filteredProducts.length === 0
    ) {

        console.warn(
            "[PXT] Nenhum produto encontrado para:",
            category
        );

        return;

    }


    grid.innerHTML = "";


    filteredProducts.forEach(
        product => {

            grid.appendChild(
                createProductCard(product)
            );

        }
    );


    setActiveCategory(category);


    console.log(
        "[PXT] Categoria filtrada:",
        category
    );

}


/* =========================================
   EVENTOS DAS CATEGORIAS
========================================= */

function setupCategoryNavigation() {

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(
        card => {

            card.addEventListener(
                "click",
                function () {

                    const category =
                        card.dataset.category;


                    filterProductsByCategory(
                        category
                    );


                    const productsSection =
                        document.getElementById(
                            "produtos"
                        );


                    if (productsSection) {

                        productsSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );

}


/* =========================================
   TRACKING DE PÁGINA
========================================= */

function trackPageView() {

    const ref =
        getCurrentRef();


    const eventData = {

        event: "page_view",

        ref:
            ref || "direto",

        page:
            window.location.pathname,

        timestamp:
            new Date().toISOString()

    };


    console.log(
        "[PXT] Page View:",
        eventData
    );

}


/* =========================================
   TRACKING DE PRODUTO
========================================= */

function trackProductClick(productId) {

    const ref =
        getCurrentRef();


    const eventData = {

        event: "affiliate_click",

        ref:
            ref || "direto",

        productId:
            productId,

        timestamp:
            new Date().toISOString()

    };


    /*
     * POR ENQUANTO:
     * observação local.
     *
     * FUTURAMENTE:
     * analytics / tracking real.
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
   CONTEXTO INICIAL
========================================= */

function applyInitialContext() {

    const ref =
        getCurrentRef();


    const category =
        getCategoryFromRef(ref);


    if (!category) {

        console.log(
            "[PXT] Nenhum contexto de categoria.",
            ref || "acesso direto"
        );

        return;

    }


    /*
     * Apenas marca a categoria.
     *
     * Os produtos já foram ordenados
     * pelo getOrderedProducts().
     */
    setActiveCategory(
        category
    );


    console.log(
        "[PXT] Contexto inicial aplicado:",
        {
            ref: ref,
            category: category
        }
    );

}


/* =========================================
   INICIALIZAÇÃO
========================================= */

function initPXT() {

    /*
     * 1. Captura a origem.
     */
    captureRef();


    /*
     * 2. Renderiza produtos,
     * já respeitando a origem.
     */
    renderProducts();


    /*
     * 3. Aplica contexto visual.
     */
    applyInitialContext();


    /*
     * 4. Registra page view.
     */
    trackPageView();


    /*
     * 5. Ativa tracking dos produtos.
     */
    setupAffiliateTracking();


    /*
     * 6. Ativa navegação das categorias.
     */
    setupCategoryNavigation();


    console.log(
        "[PXT] Sistema inicializado."
    );

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initPXT
);
