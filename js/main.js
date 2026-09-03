// Ponto de entrada — MVP Decor Colors 3D/AR

import { Viewer3D } from "./viewer.js";
import { criarPaineis, atualizarPainelProduto } from "./ui.js";
import { getProdutoByIndex, getTotalProdutos } from "./catalog.js";

const canvas = document.getElementById("viewer-canvas");
const container = document.getElementById("ui-container");

const viewer = new Viewer3D(canvas);
const ui = criarPaineis(container);

let indiceProdutoAtual = 0;
let lanternaAtiva = true;

async function carregarProduto(indice) {
  const produto = getProdutoByIndex(indice);
  if (!produto) return;

  ui.nomeProduto.textContent = "Carregando...";
  ui.categoriaProduto.textContent = "";

  try {
    await viewer.loadModel(produto.modeloBase);
    atualizarPainelProduto(ui, produto);
    ui.nomeProduto.textContent = produto.nome;
    ui.categoriaProduto.textContent = produto.categoria;

    if (produto.paleta && produto.paleta.length > 0) {
      ui.seletorCor.value = produto.paleta[0];
      viewer.setCor(produto.paleta[0]);
    }
  } catch (err) {
    console.error("Falha ao carregar modelo:", err);
    ui.nomeProduto.textContent = "Erro ao carregar modelo";
  }
}

ui.btnAnterior.addEventListener("click", () => {
  const total = getTotalProdutos();
  indiceProdutoAtual = (indiceProdutoAtual - 1 + total) % total;
  carregarProduto(indiceProdutoAtual);
});

ui.btnProximo.addEventListener("click", () => {
  const total = getTotalProdutos();
  indiceProdutoAtual = (indiceProdutoAtual + 1) % total;
  carregarProduto(indiceProdutoAtual);
});

ui.paleta.addEventListener("click", (e) => {
  if (e.target.classList.contains("amostra-cor")) {
    const cor = e.target.dataset.cor;
    ui.seletorCor.value = cor;
    viewer.setCor(cor);
  }
});

ui.seletorCor.addEventListener("input", (e) => {
  viewer.setCor(e.target.value);
});

ui.sliderLanterna.addEventListener("input", (e) => {
  const intensidade = parseFloat(e.target.value);
  viewer.setLanterna(lanternaAtiva, intensidade);
});

ui.btnLanterna.addEventListener("click", () => {
  lanternaAtiva = !lanternaAtiva;
  ui.btnLanterna.textContent = `Lanterna: ${lanternaAtiva ? "ON" : "OFF"}`;
  viewer.setLanterna(lanternaAtiva, parseFloat(ui.sliderLanterna.value));
});

window.addEventListener("resize", () => {
  const largura = container.clientWidth;
  const altura = container.clientHeight;
  viewer.resize(largura, altura);
});

carregarProduto(indiceProdutoAtual);
