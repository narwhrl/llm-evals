import './style.css';
import { DioramaScene } from './core/DioramaScene';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Container #app not found');
  }

  const diorama = new DioramaScene(container);
  diorama.animate();
});
