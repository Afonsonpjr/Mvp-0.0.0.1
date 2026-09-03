// Interface do usuario — MVP Decor Colors 3D/AR

export function criarPaineis(container) {
  const painelProduto = document.createElement("div");
  painelProduto.id = "painel-produto";
  painelProduto.className = "painel-flutuante";
  painelProduto.innerHTML = `
    <h2 id="nome-produto">Carregando...</h2>
    <p id="categoria-produto" class="categoria"></p>
    <div id="navegacao">
      <button id="btn-anterior">&#8592; Anterior</button>
      <button id="btn-proximo">Proximo &#8594;</button>
    </div>
  `;

  const painelControles = document.createElement("div");
  painelControles.id = "painel-controles";
  painelControles.className = "painel-flutuante";
  painelControles.innerHTML = `
    <h3>Cor</h3>
    <div id="paleta" class="paleta"></div>
    <label for="seletor-cor">Cor livre:</label>
    <input type="color" id="seletor-cor" value="#d8d0c8" />
    <div id="aviso-cor" class="aviso" style="display:none;"></div>
    <h3>Iluminacao</h3>
    <label for="slider-lanterna">Intensidade:</label>
    <input type="range" id="slider-lanterna" min="0" max="2" step="0.1" value="1" />
    <button id="btn-lanterna">Lanterna: ON</button>
  `;

  const painelMidia = document.createElement("div");
  painelMidia.id = "painel-midia";
  painelMidia.className = "painel-flutuante";
  painelMidia.innerHTML = `
    <h3>Videos</h3>
    <div id="lista-videos" class="lista-midia"></div>
    <h3>Referencias</h3>
    <div id="lista-referencias" class="lista-midia"></div>
  `;

  container.appendChild(painelProduto);
  container.appendChild(painelControles);
  container.appendChild(painelMidia);

  return {
    painelProduto,
    painelControles,
    painelMidia,
    nomeProduto: painelProduto.querySelector("#nome-produto"),
    categoriaProduto: painelProduto.querySelector("#categoria-produto"),
    btnAnterior: painelProduto.querySelector("#btn-anterior"),
    btnProximo: painelProduto.querySelector("#btn-proximo"),
    paleta: painelControles.querySelector("#paleta"),
    seletorCor: painelControles.querySelector("#seletor-cor"),
    avisoCor: painelControles.querySelector("#aviso-cor"),
    sliderLanterna: painelControles.querySelector("#slider-lanterna"),
    btnLanterna: painelControles.querySelector("#btn-lanterna"),
    listaVideos: painelMidia.querySelector("#lista-videos"),
    listaReferencias: painelMidia.querySelector("#lista-referencias")
  };
}

export function atualizarPainelProduto(elementos, produto) {
  elementos.nomeProduto.textContent = produto.nome;
  elementos.categoriaProduto.textContent = produto.categoria;

  elementos.paleta.innerHTML = "";
  if (produto.temPaleta && produto.paleta) {
    produto.paleta.forEach((cor) => {
      const btn = document.createElement("button");
      btn.className = "amostra-cor";
      btn.style.backgroundColor = cor;
      btn.dataset.cor = cor;
      elementos.paleta.appendChild(btn);
    });
  }

  if (produto.mostrarAvisoCor) {
    elementos.avisoCor.textContent = produto.mensagemAviso;
    elementos.avisoCor.style.display = "block";
  } else {
    elementos.avisoCor.style.display = "none";
  }

  elementos.listaVideos.innerHTML = "";
  if (produto.videos && produto.videos.length > 0) {
    produto.videos.forEach((video) => {
      const item = document.createElement("div");
      item.className = "item-midia";
      item.innerHTML = `<a href="${video.url}" target="_blank">${video.titulo}</a>`;
      elementos.listaVideos.appendChild(item);
    });
  } else {
    elementos.listaVideos.innerHTML = "<p>Sem videos disponiveis.</p>";
  }

  elementos.listaReferencias.innerHTML = "";
  if (produto.arquivosReferencia && produto.arquivosReferencia.length > 0) {
    produto.arquivosReferencia.forEach((arq) => {
      const item = document.createElement("div");
      item.className = "item-midia";
      item.textContent = arq.nome || arq;
      elementos.listaReferencias.appendChild(item);
    });
  } else {
    elementos.listaReferencias.innerHTML = "<p>Sem referencias anexadas.</p>";
  }
}
