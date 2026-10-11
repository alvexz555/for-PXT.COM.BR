
const products = [
  {
    id: "fone-01",
    name: "Inova TWS Bluetooth 5.4 Branco",
    description:
      "Fone sem fio com resistência IPX5 anunciada e autonomia anunciada de até 20 horas. Confira os detalhes na oferta.",
    image: "./images/D_NQ_NP_2X_795772-MLA114297457846_082026-F.webp",
    imageAlt: "Fone Inova TWS Bluetooth branco",
    affiliateUrl: "https://meli.la/1CiJWuD"
  },
  {
    id: "fone-02",
    name: "Basike Clip-Ear Bluetooth TWS Preto",
    description:
      "Fone sem fio com design Clip-Ear, indicado para academia e treinos. Confira os detalhes na oferta.",
    image: "./images/D_NQ_NP_2X_696122-MLA113393336263_062026-F.webp",
    imageAlt: "Fone Basike Clip-Ear Bluetooth preto",
    affiliateUrl: "https://meli.la/1bZMGPx"
  },
  {
    id: "fone-03",
    name: "Fone Bluetooth Regulável com Microfone",
    description:
      "Fone Bluetooth com microfone, ajuste regulável e redução de ruído anunciada. Confira os detalhes na oferta.",
    image: "/images/D_NQ_NP_2X_638162-MLB93167699846_092025-F.webp",
    imageAlt: "Fone Bluetooth regulável com microfone",
    affiliateUrl: "https://meli.la/2RJzpx1"
  }
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

