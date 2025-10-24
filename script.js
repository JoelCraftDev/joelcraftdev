// script.js - interactive behavior + logo particles
document.getElementById('year').innerText = new Date().getFullYear();

// Smooth scroll for nav
document.querySelectorAll('.nav-links a, .cta-btn, .cta-outline').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    document.querySelector(href).scrollIntoView({behavior:'smooth'});
  });
});

// Modal logic for buying
const modal = document.getElementById('purchase-modal');
const modalClose = document.getElementById('modal-close');
document.querySelectorAll('.buy-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const bot = btn.dataset.bot;
    const price = btn.dataset.price;
    document.getElementById('modal-bot-name').innerText = `Comprar: ${bot} — USD ${price}`;
    modal.classList.add('show');
  });
});
modalClose.addEventListener('click', ()=> modal.classList.remove('show'));
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.remove('show'); });
document.querySelectorAll('.modal-copy').forEach(b=>{
  b.addEventListener('click', ()=>{ navigator.clipboard.writeText(b.dataset.copy); b.innerText='Copiado ✓'; setTimeout(()=>b.innerText='Copiar datos',1800); });
});

// Simple particle system around the logo canvas
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.clientWidth;
  const H = canvas.height = canvas.clientHeight;
  let particles = [];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function createParticle(){
    return {
      x: W/2 + rand(-80,80),
      y: H/2 + rand(-80,80),
      vx: rand(-0.4,0.4),
      vy: rand(-0.6,-0.1),
      life: rand(60,140),
      size: rand(1,4),
      hue: rand(170,280)
    };
  }

  for(let i=0;i<60;i++) particles.push(createParticle());

  function step(){
    ctx.clearRect(0,0,W,H);
    // glow
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach((p,i)=>{
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if(p.life<=0){ particles[i]=createParticle(); }
      const alpha = Math.max(0, p.life/140);
      const g = ctx.createRadialGradient(p.x,p.y,p.size*0.1,p.x,p.y,p.size*8);
      g.addColorStop(0, `hsla(${p.hue},90%,65%,${alpha})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size*4,0,Math.PI*2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(step);
  }
  step();
})();

// small canvas for mini logo glow in nav
(function(){
  const c = document.getElementById('logo-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  let t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t += 0.02;
    // soft radial glow
    const g = ctx.createRadialGradient(W/2,H/2,4,W/2,H/2,48);
    const a = (Math.sin(t)+1)/2*0.7+0.3;
    g.addColorStop(0, `rgba(110,231,248,${a})`);
    g.addColorStop(1, 'rgba(167,139,250,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,W,H);
    requestAnimationFrame(draw);
  }
  draw();
})();
