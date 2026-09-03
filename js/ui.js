// Decor Colors 3D - MVP - UI

export function initUI() {
  return {
    nomeProduto: document.getElementById("nome-produto"),
    categoriaProduto: document.getElementById("categoria-produto"),
    paleta: document.getElementById("paleta"),
    seletorCor: document.getElementById("seletor-cor"),
    avisoCor: document.getElementById("aviso-cor"),
    listaVideos: document.getElementById("lista-videos"),
    listaReferencias: document.getElementById("lista-referencias")
  };
}

export function updateUI(produto) {
  const ui = initUI();

  ui.paleta.innerHTML = "";
  if (produto.temPaleta && produto.paleta) {
    produto.paleta.forEach((cor) => {
      const btn = document.createElement("button");
      btn.className = "amostra-cor";
      btn.style.backgroundColor = cor;
      btn.dataset.cor = cor;
      ui.paleta.appendChild(btn);
    });
  }

  if (produto.mostrarAvisoCor) {
    ui.avisoCor.textContent = produto.mensagemAviso;
    ui.avisoCor.style.display = "block";
  } else {
    ui.avisoCor.style.display = "none";
  }

  ui.listaVideos.innerHTML = "";
  if (produto.videos && produto.videos.length > 0) {
    produto.videos.forEach((video) => {
      const item = document.createElement("div");
      item.className = "item-midia";
      item.innerHTML = `<a href="${video.url}" target="_blank">${video.titulo}</a>`;
      ui.listaVideos.appendChild(item);
    });
  } else {
    ui.listaVideos.innerHTML = "<p>Sem videos disponiveis.</p>";
  }

  ui.listaReferencias.innerHTML = "";
  if (produto.arquivosReferencia && produto.arquivosReferencia.length > 0) {
    produto.arquivosReferencia.forEach((arq) => {
      const item = document.createElement("div");
      item.className = "item-midia";
      item.textContent = arq.nome || arq;
      ui.listaReferencias.appendChild(item);
    });
  } else {
    ui.listaReferencias.innerHTML = "<p>Sem referencias anexadas.</p>";
  }
}
