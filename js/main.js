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
const fadeElements = document.querySelectorAll('.section-header, .indicator-card, .stat-box, .about-content, .community-content, .contact-container, .footer-container, .tf-panel');
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
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== MOUSE PARALLAX ON HERO =====
const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-text');
const hero3d = document.querySelector('.hero-3d');
hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    if (heroText) { heroText.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`; }
    if (hero3d) { hero3d.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`; }
});
hero.addEventListener('mouseleave', () => {
    if (heroText) heroText.style.transform = 'translate(0, 0)';
    if (hero3d) hero3d.style.transform = 'translate(0, 0)';
});

// ===== PARTICLE SYSTEM =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: ${Math.random() > 0.5 ? '#FF6B00' : '#00E5FF'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
        `;
        container.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
            50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
            75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px); }
        }
    `;
    document.head.appendChild(style);
}
createParticles();

// ===== BACKGROUND CANDLE CHART (candles keep climbing upward) =====
function initBackgroundChart() {
    const chartContainer = document.getElementById('tv-chart-bg');
    if (!chartContainer) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    chartContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, candles = [], running = true, last = 0;

    function rnd(a, b) { return a + Math.random() * (b - a); }
    function newShape(c) {
        c.body = rnd(10, 48);
        c.wickUp = rnd(6, 28);
        c.wickDown = rnd(6, 28);
        c.up = Math.random() > 0.3;
    }
    function setup() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = chartContainer.clientWidth;
        H = chartContainer.clientHeight;
        if (!W || !H) return;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const small = W < 600;
        const w = small ? 8 : 12;
        const gap = w * 2.2;
        const cols = Math.ceil(W / gap) + 1;
        const perColumn = small ? 2 : 3;
        candles = [];
        for (let i = 0; i < cols; i++) {
            for (let k = 0; k < perColumn; k++) {
                const c = { x: i * gap, w: w, y: rnd(0, H + 150), speed: rnd(14, 30) };
                newShape(c);
                candles.push(c);
            }
        }
    }
    function draw(t) {
        if (!running) return;
        if (!reduceMotion) requestAnimationFrame(draw);
        const dt = Math.min((t - last) / 1000 || 0, 0.05);
        last = t;
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < candles.length; i++) {
            const c = candles[i];
            if (!reduceMotion) c.y -= c.speed * dt;
            if (c.y + c.body + c.wickDown < -20) {
                c.y = H + rnd(20, 200);
                newShape(c);
            }
            // candles glow most along the rising diagonal (bottom-left to top-right)
            const off = c.y / H - (1 - c.x / W);
            const a = 0.3 + 0.7 * Math.exp(-(off * off) / 0.12);
            const col = c.up ? '0, 229, 255' : '255, 107, 0';
            ctx.strokeStyle = 'rgba(' + col + ', ' + a + ')';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(c.x + c.w / 2, c.y - c.wickUp);
            ctx.lineTo(c.x + c.w / 2, c.y + c.body + c.wickDown);
            ctx.stroke();
            ctx.fillStyle = 'rgba(' + col + ', ' + a + ')';
            ctx.fillRect(c.x, c.y, c.w, c.body);
        }
    }
    setup();
    requestAnimationFrame(draw);
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { setup(); if (reduceMotion) draw(0); }, 200);
    });
    document.addEventListener('visibilitychange', () => {
        if (reduceMotion) return;
        if (document.hidden) { running = false; }
        else if (!running) { running = true; last = performance.now(); requestAnimationFrame(draw); }
    });
}

// ===== THREE.JS 3D CANDLESTICK SCENE =====
function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0xFF6B00, 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x00E5FF, 1, 50);
    pointLight2.position.set(-10, 5, -10);
    scene.add(pointLight2);

    const candles = [];
    const candleCount = 15;
    for (let i = 0; i < candleCount; i++) {
        const isUp = Math.random() > 0.5;
        const height = Math.random() * 2 + 0.5;
        const bodyHeight = Math.random() * 1.5 + 0.3;
        const color = isUp ? 0x00E5FF : 0xFF6B00;
        const bodyGeo = new THREE.BoxGeometry(0.3, bodyHeight, 0.3);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: color, emissive: color, emissiveIntensity: 0.5, transparent: true, opacity: 0.9,
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        const wickGeo = new THREE.CylinderGeometry(0.02, 0.02, height, 8);
        const wickMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 });
        const wick = new THREE.Mesh(wickGeo, wickMat);
        wick.position.y = (height - bodyHeight) / 2 * (isUp ? 1 : -1);
        const candleGroup = new THREE.Group();
        candleGroup.add(body);
        candleGroup.add(wick);
        candleGroup.position.set((i - candleCount / 2) * 1.2, Math.sin(i * 0.5) * 0.5, Math.cos(i * 0.3) * 2);
        candleGroup.userData = { originalY: candleGroup.position.y, speed: Math.random() * 0.5 + 0.5, offset: Math.random() * Math.PI * 2 };
        scene.add(candleGroup);
        candles.push(candleGroup);
    }

    const orbs = [];
    for (let i = 0; i < 8; i++) {
        const orbGeo = new THREE.SphereGeometry(0.1, 16, 16);
        const orbMat = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0xFFD700 : 0xFF6B00,
            emissive: i % 2 === 0 ? 0xFFD700 : 0xFF6B00, emissiveIntensity: 1,
        });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
        orb.userData = { speed: Math.random() * 0.3 + 0.1, radius: Math.random() * 5 + 3, offset: Math.random() * Math.PI * 2 };
        scene.add(orb);
        orbs.push(orb);
    }

    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        candles.forEach((candle, i) => {
            candle.position.y = candle.userData.originalY + Math.sin(time * candle.userData.speed + candle.userData.offset) * 0.3;
            candle.rotation.y = time * 0.2 + i * 0.1;
        });
        orbs.forEach(orb => {
            orb.position.x = Math.sin(time * orb.userData.speed + orb.userData.offset) * orb.userData.radius;
            orb.position.z = Math.cos(time * orb.userData.speed + orb.userData.offset) * orb.userData.radius;
            orb.position.y += Math.sin(time * 2 + orb.userData.offset) * 0.01;
        });
        scene.rotation.y = Math.sin(time * 0.1) * 0.1;
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// ===== TIME FRAME EXPLAINED =====
(function initTimeFrames() {
    const chipsBox = document.getElementById('tf-chips');
    const rowsBox = document.getElementById('tf-rows');
    const bigLabel = document.getElementById('tf-big-label');
    if (!chipsBox || !rowsBox || !bigLabel) return;
    // [big candle, [[small time frame, how many cells to draw, label shown]]]
    const TF = [
        ['1 MONTH', [['Weekly', 4, '~4'], ['Daily', 30, '~30']]],
        ['1 WEEK', [['Daily', 7, '7'], ['4H', 42, '42']]],
        ['1 DAY', [['4H', 6, '6'], ['1H', 24, '24']]],
        ['4 HOUR', [['1H', 4, '4'], ['30m', 8, '8']]],
        ['1 HOUR', [['30m', 2, '2'], ['15m', 4, '4'], ['5m', 12, '12']]],
        ['30 MIN', [['15m', 2, '2'], ['5m', 6, '6'], ['1m', 30, '30']]]
    ];
    function pick(index) {
        chipsBox.querySelectorAll('.tf-chip').forEach((chip, i) => {
            chip.classList.toggle('active', i === index);
            chip.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
        bigLabel.textContent = TF[index][0];
        rowsBox.innerHTML = '';
        TF[index][1].forEach(child => {
            const row = document.createElement('div');
            row.className = 'tf-row';
            const label = document.createElement('div');
            label.className = 'tf-row-label';
            label.innerHTML = '<b>' + child[2] + '</b> x ' + child[0] + ' candles';
            const cells = document.createElement('div');
            cells.className = 'tf-cells';
            for (let k = 0; k < child[1]; k++) {
                const cell = document.createElement('i');
                const up = Math.random() > 0.35;
                cell.style.height = (10 + Math.round(Math.random() * 22)) + 'px';
                cell.style.background = up ? 'var(--accent-cyan)' : 'var(--accent-orange)';
                cell.style.animationDelay = (k * 14) + 'ms';
                cells.appendChild(cell);
            }
            row.appendChild(label);
            row.appendChild(cells);
            rowsBox.appendChild(row);
        });
    }
    TF.forEach((item, i) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'tf-chip';
        chip.textContent = item[0];
        chip.addEventListener('click', () => pick(i));
        chipsBox.appendChild(chip);
    });
    pick(0);
})();

window.addEventListener('load', () => {
    initBackgroundChart();
    initThreeJS();
});
