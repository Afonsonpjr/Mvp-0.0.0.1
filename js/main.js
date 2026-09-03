// Decor Colors 3D - MVP

import { Viewer3D } from "./viewer.js";
import { initUI, updateUI } from "./ui.js";
import { getProdutoByIndex, getTotalProdutos } from "./catalog.js";

const canvas = document.getElementById("viewer");
const ui = initUI();

const viewer = new Viewer3D(canvas);

let indiceProdutoAtual = 0;
let lanternaAtiva = true;

async function carregarProduto(indice) {
  const produto = getProdutoByIndex(indice);
  if (!produto) return;

  document.getElementById("nome-produto").textContent = "Carregando...";
  document.getElementById("categoria-produto").textContent = "";

  try {
    await viewer.loadModel(produto.modeloBase);
    updateUI(produto);
    document.getElementById("nome-produto").textContent = produto.nome;
    document.getElementById("categoria-produto").textContent = produto.categoria;

    if (produto.paleta && produto.paleta.length > 0) {
      document.getElementById("seletor-cor").value = produto.paleta[0];
      viewer.setCor(produto.paleta[0]);
    }
  } catch (err) {
    console.error("Falha ao carregar modelo:", err);
    document.getElementById("nome-produto").textContent = "Erro ao carregar modelo";
  }
}

document.getElementById("btn-anterior").addEventListener("click", () => {
  const total = getTotalProdutos();
  indiceProdutoAtual = (indiceProdutoAtual - 1 + total) % total;
  carregarProduto(indiceProdutoAtual);
});

document.getElementById("btn-proximo").addEventListener("click", () => {
  const total = getTotalProdutos();
  indiceProdutoAtual = (indiceProdutoAtual + 1) % total;
  carregarProduto(indiceProdutoAtual);
});

document.getElementById("paleta").addEventListener("click", (e) => {
  if (e.target.classList.contains("amostra-cor")) {
    const cor = e.target.dataset.cor;
    document.getElementById("seletor-cor").value = cor;
    viewer.setCor(cor);
  }
});

document.getElementById("seletor-cor").addEventListener("input", (e) => {
  viewer.setCor(e.target.value);
});

document.getElementById("slider-lanterna").addEventListener("input", (e) => {
  const intensidade = parseFloat(e.target.value);
  viewer.setLanterna(lanternaAtiva, intensidade);
});

document.getElementById("btn-lanterna").addEventListener("click", () => {
  lanternaAtiva = !lanternaAtiva;
  document.getElementById("btn-lanterna").textContent = `Lanterna: ${lanternaAtiva ? "ON" : "OFF"}`;
  viewer.setLanterna(lanternaAtiva, parseFloat(document.getElementById("slider-lanterna").value));
});

window.addEventListener("resize", () => {
  const rect = canvas.getBoundingClientRect();
  viewer.resize(rect.width, rect.height);
});

carregarProduto(indiceProdutoAtual);
