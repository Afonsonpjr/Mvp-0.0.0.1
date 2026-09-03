# Decor Colors 3D - MVP

Configurador 3D de acabamentos especiais para Decor Colors.

## Estrutura

```
Mvp-0.0.0.1/
├── index.html          # Pagina principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   ├── main.js         # Ponto de entrada
│   ├── viewer.js       # Three.js + GLTFLoader
│   ├── ui.js           # Interface
│   └── catalog.js      # Catologo de produtos
├── models/             # Modelos 3D .glb (vazio - adicionar depois)
└── media/              # Videos e imagens (vazio - adicionar depois)
```

## Como rodar

1. Clone ou baixe o repositorio
2. Abra com um servidor local (necessario para ES6 modules):
   - VS Code: extensao Live Server
   - Python: `python -m http.server 8000`
   - Node: `npx http-server -p 8000`
3. Acesse `http://localhost:8000`

## Proximos passos

- [ ] Adicionar modelos .glb em `models/`
- [ ] Adicionar videos em `media/videos/`
- [ ] Adicionar imagens em `media/img/`
- [ ] Testar navegacao e troca de cores

## Stack

- Three.js r155 (via CDN)
- JavaScript ES6+ (modulos)
- HTML5 + CSS3

---

Privado — Decor Colors © 2026
