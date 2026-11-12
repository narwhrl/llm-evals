// Minesweeper: installed in 2005, still on the disk in 2025.
export class Mines {
  constructor(n = 8, count = 9) {
    Object.assign(this, { n, count });
    this.reset();
  }
  reset() {
    this.cells = Array.from({ length: this.n * this.n }, () => ({ mine: false, open: false, near: 0 }));
    this.status = 'new';
    this.opened = 0;
  }
  around(i) {
    const n = this.n, x = i % n, y = (i / n) | 0, out = [];
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy;
        if ((dx || dy) && xx >= 0 && yy >= 0 && xx < n && yy < n) out.push(yy * n + xx);
      }
    return out;
  }
  // Mines are laid on the first click, never under it. `pick` is injectable for the self-test.
  lay(safe, pick = Math.random) {
    const free = this.cells.map((_, i) => i).filter((i) => i !== safe);
    for (let k = 0; k < this.count; k++) this.cells[free.splice((pick() * free.length) | 0, 1)[0]].mine = true;
    this.cells.forEach((c, i) => (c.near = this.around(i).filter((j) => this.cells[j].mine).length));
    this.status = 'play';
  }
  reveal(i, pick) {
    if (this.status === 'new') this.lay(i, pick);
    if (this.status !== 'play' || this.cells[i].open) return;
    const stack = [i];
    while (stack.length) {
      const j = stack.pop(), c = this.cells[j];
      if (c.open) continue;
      c.open = true;
      if (c.mine) return void (this.status = 'lost');
      this.opened++;
      if (!c.near) stack.push(...this.around(j).filter((k) => !this.cells[k].open));
    }
    if (this.opened === this.cells.length - this.count) this.status = 'won';
  }
}
