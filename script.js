// Check if device is touch-capable
const isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
};

// 1. Custom Cursor (Desktop Only)
if (!isTouchDevice() && window.innerWidth > 900) {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
  });

  function animCursor() {
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a, button, .skill-card, .project-card, .stat').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '.5';
    });
  });
}

// 2. Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  // Prevent scrolling when menu is open
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// 3. Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// 4. Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => obs.observe(r));

// 5. Footer time
function updateTime() {
  const t = new Date().toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  document.getElementById('footer-time').textContent = t;
}
updateTime(); 
setInterval(updateTime, 1000);

// 6. Contact Form
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  e.target.querySelectorAll('.form-field').forEach(f => f.value = '');
  setTimeout(() => msg.style.display = 'none', 4000);
}

// 7. Typing effect on hero tag
const tag = document.querySelector('.hero-tag');
if (tag) {
  tag.style.opacity = 0;
  setTimeout(() => { 
    tag.style.transition = 'opacity .5s'; 
    tag.style.opacity = 1; 
  }, 400);
}