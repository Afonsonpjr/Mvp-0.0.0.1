// Catalogo de produtos — MVP Decor Colors 3D/AR

export const catalog = [
  {
    id: "quartzo-mica",
    nome: "Quartzo Mica",
    categoria: "acabamento-especial",
    bases: 5,
    modeloBase: "/models/quartzo-mica/base-01.glb",
    variacoes: [
      { id: "base-01", nome: "Base 01", arquivo: "/models/quartzo-mica/base-01.glb" },
      { id: "base-02", nome: "Base 02", arquivo: "/models/quartzo-mica/base-02.glb" },
      { id: "base-03", nome: "Base 03", arquivo: "/models/quartzo-mica/base-03.glb" },
      { id: "base-04", nome: "Base 04", arquivo: "/models/quartzo-mica/base-04.glb" },
      { id: "base-05", nome: "Base 05", arquivo: "/models/quartzo-mica/base-05.glb" }
    ],
    temPaleta: true,
    temSeletorLivre: true,
    mostrarAvisoCor: true,
    mensagemAviso: "A cor visual pode variar conforme luz, tela e aplicacao.",
    paleta: ["#d8d0c8", "#b8afa5", "#8e8478", "#6b5f55", "#4a4036"],
    videos: [
      { titulo: "Aplicacao em ambiente interno", url: "media/videos/quartzo-mica/demo-01.mp4" }
    ],
    arquivosReferencia: [],
    tags: ["mica", "quartzo", "brilho", "parede", "interno"],
    observacoes: ["Valorizar efeito sob luz direcionada", "Comparar iluminacao neutra, quente e fria"]
  },
  {
    id: "cimento-aveludado-diamantado",
    nome: "Cimento Aveludado Diamantado",
    categoria: "acabamento-especial",
    bases: 10,
    modeloBase: "/models/cimento-aveludado-diamantado/base-01.glb",
    variacoes: Array.from({ length: 10 }, (_, i) => ({
      id: `base-${String(i + 1).padStart(2, "0")}`,
      nome: `Base ${String(i + 1).padStart(2, "0")}`,
      arquivo: `/models/cimento-aveludado-diamantado/base-${String(i + 1).padStart(2, "0")}.glb`
    })),
    temPaleta: true,
    temSeletorLivre: true,
    mostrarAvisoCor: true,
    mensagemAviso: "A cor visual pode variar conforme luz, tela e aplicacao.",
    paleta: ["#d8d0c8", "#b8afa5", "#8e8478", "#6b5f55", "#4a4036"],
    videos: [
      { titulo: "Aplicacao em ambiente interno", url: "media/videos/cimento-aveludado-diamantado/demo-01.mp4" }
    ],
    arquivosReferencia: [],
    tags: ["cimento", "diamantado", "brilho", "parede", "interno"],
    observacoes: ["Valorizar efeito sob luz direcionada", "Comparar iluminacao neutra, quente e fria"]
  }
];

export function getProdutoById(id) {
  return catalog.find(p => p.id === id) || null;
}

export function getProdutoByIndex(index) {
  return catalog[index] || null;
}

export function getTotalProdutos() {
  return catalog.length;
}
