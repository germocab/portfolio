(() => {
  'use strict';
  // Edit your projects here. `c` = [background, foreground, accent] for the placeholder art.
  const PROJECTS = [
    { t: 'Right Now', y: 2026, k: ['Product design', 'Brand'], d: 'A one-task-only productivity PWA. A bold typographic identity and an interface where the limitation is the feature.', c: ['#1B38F5', '#F5F3EC', '#FFE500'], l: '#' },
    { t: 'FlemingApp', y: 2026, k: ['UX/UI', 'Web app'], d: 'A web app for managing a congregation: schedules, assignments and administration, designed for clarity at a glance.', c: ['#F5F3EC', '#0A0A0A', '#1B38F5'], l: '#' },
    { t: 'Paper', y: 2026, k: ['UI', 'PWA', 'Prototype'], d: 'An e-reader emulator with its own OS-style interface, covering reading sessions and book tracking.', c: ['#0A0A0A', '#FFE500', '#F5F3EC'], l: '#' },
    { t: 'Norte Coffee', y: 2024, k: ['Brand identity', 'Packaging'], d: '[Placeholder] Naming, identity and packaging for a specialty roaster.', c: ['#FFE500', '#0A0A0A', '#1B38F5'], l: '#' },
    { t: 'Kin Bank', y: 2023, k: ['UX/UI', 'Design system'], d: '[Placeholder] Mobile banking app and design system for a challenger bank.', c: ['#1B38F5', '#FFE500', '#F5F3EC'], l: '#' }
  ];

  const list = document.getElementById('projects');
  PROJECTS.forEach((p, i) => {
    const li = document.createElement('li');
    li.className = 'proj';
    const initials = p.t.split(' ').map(w => w[0]).join('').slice(0, 2);
    li.innerHTML = `
      <h3><button type="button" aria-expanded="false" aria-controls="p${i}">
        <span class="pt"></span><span class="pm"></span></button></h3>
      <div class="pw" id="p${i}" role="region" inert><div><div class="pbody">
        <div class="art" role="img" style="--bg:${p.c[0]};--fg:${p.c[1]};--ac:${p.c[2]}"><span></span></div>
        <div class="pinfo"><p></p><ul></ul><a href="${p.l}">VIEW CASE STUDY →</a></div>
      </div></div></div>`;
    li.querySelector('.pt').textContent = p.t;
    li.querySelector('.pm').textContent = `${p.k[0]} · ${p.y}`;
    li.querySelector('.art').setAttribute('aria-label', `${p.t} project artwork placeholder`);
    li.querySelector('.art span').textContent = initials;
    li.querySelector('.pinfo p').textContent = p.d;
    p.k.concat(String(p.y)).forEach(k => { const t = document.createElement('li'); t.textContent = k; li.querySelector('ul').append(t); });
    list.append(li);
  });

  // Only one project open at a time
  list.addEventListener('click', e => {
    const btn = e.target.closest('h3 button');
    if (!btn) return;
    const item = btn.closest('.proj');
    const willOpen = !item.classList.contains('open');
    list.querySelectorAll('.proj.open').forEach(o => setOpen(o, false));
    if (willOpen) setOpen(item, true);
  });
  function setOpen(item, open) {
    item.classList.toggle('open', open);
    item.querySelector('button').setAttribute('aria-expanded', open);
    item.querySelector('.pw').inert = !open;
  }

  // Page clock, derived from timestamps like the Right Now timer
  const started = Date.now(), clock = document.getElementById('clock');
  const pad = n => String(n).padStart(2, '0');
  const tick = () => {
    const s = Math.floor((Date.now() - started) / 1000);
    clock.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s % 3600 / 60))}:${pad(s % 60)}`;
  };
  tick(); setInterval(tick, 1000);

  document.getElementById('year').textContent = new Date().getFullYear();

  const copy = document.getElementById('copy'), mail = document.getElementById('mail');
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(mail.textContent.trim()); copy.textContent = 'COPIED.'; }
    catch { copy.textContent = 'SELECT IT ↑'; }
    setTimeout(() => (copy.textContent = 'COPY EMAIL'), 1800);
  });
})();
