
const products = [
  {
    id: "fone-01",
    name: "Inova TWS Bluetooth 5.4 Branco",
    description:
      "Fone Bluetooth sem fio com proteção IPX5 anunciada e autonomia de até 20 horas, conforme informações do fabricante.",
    image: "./images/D_NQ_NP_2X_795772-MLA114297457846_082026-F.webp",
    imageAlt: "Fone Inova TWS Bluetooth branco",
    affiliateUrl: "https://meli.la/1CiJWuD"
  },
  {
    id: "fone-02",
    name: "Basike Clip-Ear Bluetooth TWS Preto",
    description:
      "Fone Bluetooth com encaixe Clip-Ear, desenvolvido para acompanhar atividades físicas e treinos.",
    image: "./images/D_NQ_NP_2X_696122-MLA113393336263_062026-F.webp",
    imageAlt: "Fone Basike Clip-Ear Bluetooth preto",
    affiliateUrl: "https://meli.la/1bZMGPx"
  },
  {
    id: "fone-03",
    name: "Fone Bluetooth Regulável com Microfone",
    description:
      "Fone Bluetooth com microfone integrado, ajuste regulável e recurso de redução de ruído anunciado.",
    image: "./images/D_NQ_NP_2X_638162-MLB93167699846_092025-F-fone-ouvido-bluetooth-regulavel-com-microfone-e-reduco-ruid.webp",
    imageAlt: "Fone Bluetooth regulável com microfone",
    affiliateUrl: "https://meli.la/2RJzpx1"
  },
  {
    id: "fone-04",
    name: "Fone de Ouvido TWS In-ear Gamer Sem Fio, Preto, com Microfone e LED Para Esporte, da 3Tech",
    description:
      "Fone TWS gamer com conexão Bluetooth, microfone integrado e iluminação LED. A autonomia anunciada é de até 8 horas.",
    image: "./images/D_NQ_NP_2X_690729-MLA118811431933_102026-F.webp",
    imageAlt: "Fone Gamer Sem Fio, Preto",
    affiliateUrl: "https://meli.la/2mbgiHP"
  },
  {
    id: "fone-05",
    name: "2 Fones P2 Premium Cabo Trançado Reforçado Microfone Pc 1.2m",
    description:
      "Kit com dois fones de ouvido P2, cabo trançado reforçado, microfone integrado e comprimento de 1,2 metro.",
    image: "./images/D_NQ_NP_2X_965949-MLB118972042413_102026-F-2-fones-p2-premium-cabo-trancado-reforcado-microfone-pc-12m.webp",
    imageAlt: "2 Fones P2 Premium",
    affiliateUrl: "https://meli.la/1mzjkLi"
  },
  {
    id: "fone-06",
    name: "Fone De Ouvido Sem Fio Bluetooth",
    description:
      "Fone Bluetooth sem fio na cor branca, com bateria recarregável e design compacto para uso diário.",
    image: "./images/fone branquinho.webp",
    imageAlt: "fone Bluetooth premium",
    affiliateUrl: "https://meli.la/1j3gwez"
  },
  {
    id: "fone-08",
    name: "QKZ AK6 Ares In-Ear com Microfone e Case",
    description:
      "Fone com fio e encaixe in-ear, microfone integrado e conexão P2. Acompanha case de transporte e ponteiras extras para melhor adaptação.",
    image: "https://judgeme.imgix.net/kz-music-store/1754776170__img_5698__original.jpeg?auto=format&w=1024",
    imageAlt: "Fone QKZ AK6 Ares preto e dourado com case de transporte",
    affiliateUrl: "https://meli.la/2zgUVys"
  },
  {
    id: "fone-09",
    name: "Headset Gamer Havit H2232D Over-Ear RGB",
    description:
      "Headset gamer over-ear com iluminação RGB, microfone flexível, conexão com fio e drivers de 50 mm para jogos e uso diário.",
    image: "https://fujiokadistribuidor.vteximg.com.br/arquivos/ids/389879-1000-1000/p_59367_alta_3.jpg?v=638603833063300000",
    imageAlt: "Headset gamer Havit H2232D preto com iluminação RGB e microfone flexível",
    affiliateUrl: "https://meli.la/2rQrxHz"
  },
  {
    id: "fone-07",
    name: "Fone gamer a prova de respingos",
    description:
      "Fone TWS gamer com conexão Bluetooth e proteção contra respingos anunciada. Uma opção compacta para jogos e uso cotidiano.",
    image: "./images/respingo.webp",
    imageAlt: "Fone Gamer Bluetooth X15 Aprova De Respingos Dágua Led",
    affiliateUrl: "https://meli.la/25coN6J"
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

