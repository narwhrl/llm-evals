import { teamName } from "../sim/match.js";
import { WEAPONS } from "../sim/weapons.js";

function clock(seconds) {
  const left = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(left / 60);
  const s = left % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function weaponName(id) {
  return WEAPONS[id]?.name || "环境";
}

export function createHud(solids) {
  const els = {
    hud: document.querySelector("#hud"),
    scoreGr: document.querySelector("#score-gr"),
    scoreBl: document.querySelector("#score-bl"),
    clock: document.querySelector("#clock"),
    heading: document.querySelector("#heading"),
    map: document.querySelector("#minimap"),
    feed: document.querySelector("#feed"),
    cross: document.querySelector("#crosshair"),
    hitmark: document.querySelector("#hitmark"),
    scope: document.querySelector("#scope"),
    dirs: document.querySelector("#hit-dirs"),
    vignette: document.querySelector("#vignette"),
    hp: document.querySelector("#hp-fill"),
    hpNum: document.querySelector("#hp-num"),
    armor: document.querySelector("#armor-fill"),
    armorNum: document.querySelector("#armor-num"),
    protect: document.querySelector("#protect"),
    weapon: document.querySelector("#weapon-name"),
    ammo: document.querySelector("#ammo"),
    cook: document.querySelector("#cook"),
    frag: document.querySelector("#gear-frag"),
    smoke: document.querySelector("#gear-smoke"),
    hint: document.querySelector("#hint"),
    death: document.querySelector("#death"),
    deathDetail: document.querySelector("#death-detail"),
    board: document.querySelector("#board"),
    finish: document.querySelector("#finish"),
    finishTitle: document.querySelector("#finish-title"),
    finishScore: document.querySelector("#finish-score"),
  };
  document.body.appendChild(els.board);
  const mapCtx = els.map.getContext("2d");
  const staticMap = document.createElement("canvas");
  staticMap.width = els.map.width;
  staticMap.height = els.map.height;
  paintMap(staticMap.getContext("2d"), solids, staticMap.width, staticMap.height);

  const wedges = [];
  for (let i = 0; i < 8; i += 1) {
    const mark = document.createElement("i");
    mark.style.transform = `rotate(${i * 45}deg)`;
    els.dirs.appendChild(mark);
    wedges.push({ mark, life: 0 });
  }
  const feed = [];
  const blips = [];
  let hitLife = 0;

  function project(x, z, w, h) {
    return [((x + 9) / 18) * w, ((z + 32) / 64) * h];
  }

  return {
    show(playing) {
      els.hud.hidden = !playing;
    },
    reset() {
      feed.length = 0;
      blips.length = 0;
      els.feed.innerHTML = "";
      hitLife = 0;
    },
    note(events, player, actors) {
      for (const event of events) {
        if (event.type === "kill") {
          feed.unshift({
            text: `${event.killerName}  ·  ${weaponName(event.weapon)}  ·  ${event.victimName}`,
            team: event.team,
            life: 4.2,
          });
          if (feed.length > 5) feed.pop();
        }
        if (event.type === "hit" && player && event.attackerId === player.id) hitLife = 0.12;
        if (event.type === "hit" && player && event.victimId === player.id && event.attackerId) {
          const attacker = actors.find((actor) => actor.id === event.attackerId);
          if (attacker) {
            let delta = Math.atan2(attacker.x - player.x, attacker.z - player.z) - player.yaw;
            while (delta > Math.PI) delta -= Math.PI * 2;
            while (delta < -Math.PI) delta += Math.PI * 2;
            const index = ((Math.round(delta / (Math.PI / 4)) % 8) + 8) % 8;
            wedges[index].life = 0.45;
          }
        }
        if (event.type === "shot" && player && event.team !== player.team) {
          blips.push({ x: event.origin.x, z: event.origin.z, life: 1.15 });
        }
      }
    },
    update(state, player, dt, extras) {
      for (const item of feed) item.life -= dt;
      while (feed.length && feed[feed.length - 1].life <= 0) feed.pop();
      els.feed.innerHTML = feed
        .map((item) => `<li class="${item.team}" style="opacity:${Math.min(1, item.life)}">${item.text}</li>`)
        .join("");
      hitLife = Math.max(0, hitLife - dt);
      els.hitmark.className = hitLife > 0 ? "on" : "";
      for (const wedge of wedges) {
        wedge.life = Math.max(0, wedge.life - dt);
        wedge.mark.style.opacity = wedge.life > 0 ? "0.9" : "0";
      }
      for (let i = blips.length - 1; i >= 0; i -= 1) {
        blips[i].life -= dt;
        if (blips[i].life <= 0) blips.splice(i, 1);
      }
      if (!player) return;
      els.scoreGr.textContent = String(state.score.gr);
      els.scoreBl.textContent = String(state.score.bl);
      els.clock.textContent = clock(state.duration - state.time);
      const yaw = ((player.yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      els.heading.textContent = ["船尾", "右舷", "船头", "左舷"][Math.round(yaw / (Math.PI / 2)) % 4];
      const weapon = WEAPONS[player.weapon];
      els.weapon.textContent = weapon?.name || "";
      if (weapon?.kind === "gun") {
        const ammo = player.ammo[weapon.id];
        els.ammo.innerHTML = `${ammo.mag} <small>/ ${ammo.reserve}</small>`;
      } else if (weapon?.kind === "nade") {
        els.ammo.innerHTML = `${player.gear[weapon.id] || 0}`;
      } else els.ammo.textContent = "";
      els.frag.textContent = `手雷 ${player.gear.frag}`;
      els.smoke.textContent = `烟雾 ${player.gear.smoke}`;
      els.hp.style.width = `${Math.max(0, player.hp)}%`;
      els.armor.style.width = `${Math.max(0, player.armor) * 4}%`;
      els.hpNum.textContent = String(Math.ceil(player.hp));
      els.armorNum.textContent = String(Math.ceil(player.armor));
      els.protect.hidden = !(player.alive && player.protect > 0);
      els.cook.hidden = !player.holdingNade;
      if (player.holdingNade && weapon?.fuse) {
        els.cook.firstElementChild.style.width = `${Math.min(100, (player.cook / weapon.fuse) * 100)}%`;
      }
      const scoped = player.alive && player.weapon === "bolt" && player.ads;
      els.scope.hidden = !scoped;
      els.cross.hidden = !player.alive || scoped;
      const moving = Math.hypot(player.vx, player.vz) > 1.2;
      let gap = 8;
      if (weapon?.kind === "gun") {
        let spread = weapon.spread || 0;
        if (moving) spread += weapon.moveSpread || 0;
        if (player.ads) spread = weapon.adsSpread || spread;
        gap = 5 + spread * 1100;
      }
      els.cross.style.setProperty("--gap", `${gap}px`);
      els.vignette.style.opacity = player.alive ? String(Math.max(player.hurtFlash * 1.4, player.hp < 35 ? 0.45 : 0)) : "0.55";
      els.death.hidden = player.alive || state.phase === "end";
      if (!player.alive) {
        const killer = state.actors.find((actor) => actor.id === player.killerId);
        els.deathDetail.textContent = killer ? `${killer.name} 击倒了你 · ${player.deadTimer.toFixed(1)} 秒后复活` : `${player.deadTimer.toFixed(1)} 秒后在舱内复活`;
      }
      els.hint.hidden = !extras.showHint;
      els.board.hidden = !extras.board;
      if (extras.board) els.board.innerHTML = scoreboard(state);
      paintDynamic(mapCtx, staticMap, state, player, blips);
      if (state.phase === "end") {
        els.finish.hidden = false;
        const winner = state.winner === "tie" ? "平局" : `${teamName(state.winner)}获胜`;
        els.finishTitle.textContent = winner;
        els.finishScore.textContent = `保卫者 ${state.score.gr}  ·  潜伏者 ${state.score.bl}`;
      }
    },
  };

  function scoreboard(state) {
    const row = (actor) => `<tr class="${actor.team}${actor.isPlayer ? " me" : ""}"><td>${actor.name}</td><td>${actor.kills}</td><td>${actor.deaths}</td></tr>`;
    const side = (team) => state.actors.filter((actor) => actor.team === team).sort((a, b) => b.kills - a.kills).map(row).join("");
    return `<thead><tr><th>乘员</th><th>击杀</th><th>阵亡</th></tr></thead><tbody><tr><th colspan="3">保卫者</th></tr>${side("gr")}<tr><th colspan="3">潜伏者</th></tr>${side("bl")}</tbody>`;
  }
}

function paintMap(ctx, solids, w, h) {
  ctx.fillStyle = "#16343c";
  ctx.fillRect(0, 0, w, h);
  const deck = (x, z, sx, sz, color) => {
    const px = ((x + 9) / 18) * w;
    const py = ((z + 32) / 64) * h;
    ctx.fillStyle = color;
    ctx.fillRect(px - (sx / 18) * w * 0.5, py - (sz / 64) * h * 0.5, (sx / 18) * w, (sz / 64) * h);
  };
  deck(0, 0, 16.3, 60.8, "#5c6560");
  for (const solid of solids) {
    if (solid.tag === "floor") continue;
    ctx.save();
    const px = ((solid.x + 9) / 18) * w;
    const py = ((solid.z + 32) / 64) * h;
    ctx.translate(px, py);
    ctx.rotate(-(solid.yaw || 0));
    ctx.fillStyle = solid.color;
    ctx.globalAlpha = solid.tag === "rail" ? 0.7 : 0.95;
    ctx.fillRect((-(solid.sx / 18) * w) / 2, (-(solid.sz / 64) * h) / 2, (solid.sx / 18) * w, (solid.sz / 64) * h);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#f3ead7";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("船头", w / 2, 36);
  ctx.fillText("船尾", w / 2, h - 18);
}

function paintDynamic(ctx, base, state, player, blips) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(base, 0, 0);
  const dot = (x, z, color, r) => {
    const px = ((x + 9) / 18) * w;
    const py = ((z + 32) / 64) * h;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
  };
  for (const actor of state.actors) {
    if (!actor.alive || actor.isPlayer || actor.team !== player.team) continue;
    dot(actor.x, actor.z, "#f2d48a", 7);
  }
  for (const blip of blips) {
    ctx.globalAlpha = Math.min(1, blip.life);
    dot(blip.x, blip.z, "#e07a62", 6);
    ctx.globalAlpha = 1;
  }
  const px = ((player.x + 9) / 18) * w;
  const py = ((player.z + 32) / 64) * h;
  ctx.save();
  ctx.translate(px, py);
  ctx.rotate(-player.yaw);
  ctx.fillStyle = "#f7f3ea";
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(6, -8);
  ctx.lineTo(-6, -8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
