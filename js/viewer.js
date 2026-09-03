// Viewer 3D — MVP Decor Colors 3D/AR

import * as THREE from "https://unpkg.com/three@0.155.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.155.0/examples/jsm/loaders/GLTFLoader.js";

export class Viewer3D {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
    this.loader = new GLTFLoader();
    this.currentModel = null;
    this.currentMaterial = null;
    this.spotLight = null;
    this.init();
  }

  init() {
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.camera.position.set(0, 0, 3);
    this.scene.add(this.camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    this.spotLight = new THREE.SpotLight(0xffffff, 1.0);
    this.spotLight.position.set(2, 2, 2);
    this.spotLight.angle = Math.PI / 6;
    this.spotLight.penumbra = 0.5;
    this.spotLight.decay = 2;
    this.spotLight.distance = 10;
    this.spotLight.castShadow = false;
    this.scene.add(this.spotLight);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  loadModel(url, onProgress, onError) {
    return new Promise((resolve, reject) => {
      if (this.currentModel) {
        this.scene.remove(this.currentModel);
        this.currentModel = null;
      }

      this.loader.load(
        url,
        (gltf) => {
          this.currentModel = gltf.scene;
          this.scene.add(this.currentModel);

          const box = new THREE.Box3().setFromObject(this.currentModel);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 1.5 / maxDim;
          this.currentModel.scale.set(scale, scale, scale);
          box.setFromObject(this.currentModel);
          const center = box.getCenter(new THREE.Vector3());
          this.currentModel.position.sub(center);

          if (this.currentModel.children.length > 0) {
            this.currentMaterial = this.currentModel.children[0].material;
          }

          resolve(this.currentModel);
        },
        onProgress,
        (error) => {
          console.error("Erro ao carregar modelo:", error);
          if (onError) onError(error);
          reject(error);
        }
      );
    });
  }

  setCor(hexColor) {
    if (this.currentMaterial) {
      const color = new THREE.Color(hexColor);
      this.currentMaterial.color = color;
      this.currentMaterial.needsUpdate = true;
    }
  }

  setLanterna(ativo, intensidade = 1.0, cor = 0xffffff) {
    this.spotLight.intensity = ativo ? intensidade : 0;
    this.spotLight.color = new THREE.Color(cor);
  }

  resize(largura, altura) {
    this.camera.aspect = largura / altura;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(largura, altura);
  }
}
