// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => { loadingScreen.classList.add('hidden'); }, 2800);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});
document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL-TRIGGERED FADE-IN =====
const fadeElements = document.querySelectorAll('.section-header, .indicator-card, .stat-box, .about-content, .community-content, .contact-container, .footer-container');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
fadeElements.forEach(el => { el.classList.add('fade-in'); fadeObserver.observe(el); });

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-counter');
let countersAnimated = false;
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) { counter.textContent = Math.floor(current); requestAnimationFrame(updateCounter); }
                    else { counter.textContent = target; }
                };
                updateCounter();
            });
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => counterObserver.observe(counter));

// ===== HERO STAT NUMBER ANIMATION =====
const heroStatNumbers = document.querySelectorAll('.stat-number[data-target]');
heroStatNumbers.forEach(num => {
    const target = parseInt(num.getAttribute('data-target'));
    let current = 0;
    const step = target / 60;
    const updateNum = () => {
        current += step;
        if (current < target) { num.textContent = Math.floor(current); requestAnimationFrame(updateNum); }
        else { num.textContent = target; }
    };
    setTimeout(updateNum, 1500);
});

// ===== 3D CARD TILT EFFECT =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== MOUSE PARALLAX ON HERO =====
const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-content');
hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroText) { heroText.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`; }
});
hero.addEventListener('mouseleave', () => {
    if (heroText) heroText.style.transform = 'translate(0, 0)';
});

// ===== PARTICLE SYSTEM =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const color = Math.random() > 0.5 ? '#FF6B00' : '#00E5FF';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            position: absolute; width: ${size}px; height: ${size}px;
            background: ${color}; border-radius: 50%;
            left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.4 + 0.1};
            animation: floatParticle ${Math.random() * 12 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
            box-shadow: 0 0 ${Math.random() * 12 + 6}px ${color};
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            33% { transform: translate(${Math.random()*40-20}px, ${Math.random()*-40-10}px) scale(1.2); opacity: 0.7; }
            66% { transform: translate(${Math.random()*40-20}px, ${Math.random()*40+10}px) scale(0.8); opacity: 0.5; }
        }
    `;
    document.head.appendChild(style);
}
createParticles();

// ===== BACKGROUND CANDLE CHART (keeps rising upward, no right-to-left scroll) =====
function initBackgroundChart() {
    const chartContainer = document.getElementById('tv-chart-bg');
    if (!chartContainer) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    chartContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, candles = [], offset = 0, last = 0, running = true;

    // One uptrend: candles climb from bottom-left to top-right
    function build() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = chartContainer.clientWidth;
        H = chartContainer.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = W < 768 ? 36 : 80;
        const step = W / count;
        candles = [];
        let drift = 0;
        for (let i = 0; i < count; i++) {
            const f = i / (count - 1);
            drift = drift * 0.9 + (Math.random() - 0.5) * H * 0.04;
            const center = H * (0.92 - 0.84 * f) + drift;
            const body = H * (0.015 + Math.random() * 0.05);
            const up = Math.random() < 0.6;
            const top = center - body / 2;
            const bottom = center + body / 2;
            candles.push({
                x: i * step + step / 2,
                w: Math.max(3, step * 0.55),
                top: top,
                bottom: bottom,
                wickTop: top - Math.random() * H * 0.04,
                wickBottom: bottom + Math.random() * H * 0.04,
                color: up ? '#00E5FF' : '#FF6B00'
            });
        }
    }

    function drawSet(dy) {
        for (let i = 0; i < candles.length; i++) {
            const c = candles[i];
            if (c.wickBottom + dy < 0 || c.wickTop + dy > H) continue;
            ctx.strokeStyle = c.color;
            ctx.fillStyle = c.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(c.x, c.wickTop + dy);
            ctx.lineTo(c.x, c.wickBottom + dy);
            ctx.stroke();
            ctx.fillRect(c.x - c.w / 2, c.top + dy, c.w, c.bottom - c.top);
        }
    }

    function frame() {
        ctx.clearRect(0, 0, W, H);
        // two copies one screen apart, so the climb never has a gap or a jump
        drawSet(-offset);
        drawSet(H - offset);
    }

    function loop(ts) {
        if (!running) return;
        requestAnimationFrame(loop);
        const dt = Math.min((ts - last) / 1000 || 0, 0.05);
        last = ts;
        offset = (offset + dt * 14) % H;
        frame();
    }

    build();
    if (reduceMotion) {
        frame();
    } else {
        requestAnimationFrame(loop);
        // pause while the tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { running = false; }
            else if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); }
        });
    }
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { build(); if (reduceMotion) frame(); }, 200);
    });
}

// ===== 2D FLOWER BLOOM CANVAS (About Section) =====
function initFlowerBloom() {
    const canvas = document.getElementById('flower-canvas');
    if (!canvas || window.innerWidth < 1024) return;
    const ctx = canvas.getContext('2d');
    let bloomProgress = 0;
    let hasBloomed = false;
    const petals = 8;
    const centerX = 200;
    const centerY = 200;

    function drawFlower(progress) {
        ctx.clearRect(0, 0, 400, 400);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        for (let i = 0; i < petals; i++) {
            const angle = (i / petals) * Math.PI * 2 - Math.PI / 2;
            const petalLength = 80 * eased;
            const petalWidth = 25 * eased;
            const openAngle = angle + Math.PI / 6 * eased;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(openAngle);
            ctx.beginPath();
            ctx.ellipse(petalLength / 2, 0, petalLength / 2, petalWidth / 2, 0, 0, Math.PI * 2);
            const gradient = ctx.createLinearGradient(0, -petalWidth/2, 0, petalWidth/2);
            gradient.addColorStop(0, 'rgba(255, 107, 0, 0.15)');
            gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.25)');
            gradient.addColorStop(1, 'rgba(255, 107, 0, 0.15)');
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 107, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
        // Center
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15 * eased, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 107, 0, 0.4)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8 * eased, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.fill();
    }

    const flowerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasBloomed) {
                hasBloomed = true;
                let start = null;
                function bloom(timestamp) {
                    if (!start) start = timestamp;
                    const elapsed = timestamp - start;
                    bloomProgress = Math.min(elapsed / 2000, 1);
                    drawFlower(bloomProgress);
                    if (bloomProgress < 1) requestAnimationFrame(bloom);
                }
                requestAnimationFrame(bloom);
            }
        });
    }, { threshold: 0.4 });
    flowerObserver.observe(document.getElementById('about'));
}

window.addEventListener('load', () => {
    initBackgroundChart();
    initFlowerBloom();
});
