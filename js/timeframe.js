// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
function updateHeader() {
    if (window.pageYOffset > 50) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', updateHeader);
updateHeader();

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// ===== TIME FRAME EXPLAINED =====
(function () {
    const chipsEl = document.getElementById('tf-chips');
    const rowsEl = document.getElementById('tf-rows');
    const bigLabel = document.getElementById('tf-big-label');

    // [label, [[smaller time frame, how many fit inside, text shown]]]
    const TIME_FRAMES = [
        ['1 MONTH', [['Weekly', 4, '~4'], ['Daily', 30, '~30']]],
        ['1 WEEK',  [['Daily', 7, '7'], ['4H', 42, '42']]],
        ['1 DAY',   [['4H', 6, '6'], ['1H', 24, '24']]],
        ['4 HOUR',  [['1H', 4, '4'], ['30m', 8, '8']]],
        ['1 HOUR',  [['30m', 2, '2'], ['15m', 4, '4'], ['5m', 12, '12']]],
        ['30 MIN',  [['15m', 2, '2'], ['5m', 6, '6'], ['1m', 30, '30']]]
    ];

    function select(index) {
        chipsEl.querySelectorAll('.tf-chip').forEach((chip, i) => {
            chip.classList.toggle('active', i === index);
            chip.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });
        bigLabel.textContent = TIME_FRAMES[index][0];
        rowsEl.innerHTML = '';
        TIME_FRAMES[index][1].forEach(child => {
            const row = document.createElement('div');
            row.className = 'tf-row';
            let cells = '';
            for (let k = 0; k < child[1]; k++) {
                const up = Math.random() > 0.35;
                const h = 10 + Math.round(Math.random() * 22);
                cells += '<i style="height:' + h + 'px;background:' + (up ? 'var(--accent-cyan)' : 'var(--accent-orange)') + ';animation-delay:' + (k * 14) + 'ms"></i>';
            }
            row.innerHTML = '<div class="tf-row-label"><em>' + child[2] + '</em> x ' + child[0] + ' candles</div><div class="tf-cells">' + cells + '</div>';
            rowsEl.appendChild(row);
        });
    }

    TIME_FRAMES.forEach((tf, i) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'tf-chip';
        chip.textContent = tf[0];
        chip.addEventListener('click', () => select(i));
        chipsEl.appendChild(chip);
    });
    select(0);
})();

// ===== SCROLL-TRIGGERED FADE-IN =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.tf-hero-inner, .tf-container, .tf-cta, .footer-container').forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});
