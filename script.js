// Preloader Logic
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Back to Top Logic
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backBtn.classList.add('show');
    else backBtn.classList.remove('show');
});

// Fee Calculator
let facilitiesTotal = 0;
function toggleOption(element, cost) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) facilitiesTotal += cost;
    else facilitiesTotal -= cost;
    calculateFee();
}
function calculateFee() {
    const classFee = parseInt(document.getElementById('class-select').value);
    const total = classFee + facilitiesTotal;
    document.getElementById('fee-display').innerText = `Total Estimated: $${total} / Month`;
}
function downloadFeePDF() {
    const classVal = document.getElementById('class-select').options[document.getElementById('class-select').selectedIndex].text;
    const total = document.getElementById('fee-display').innerText;
    alert(`Downloading Fee Breakdown for:\n${classVal}\n${total}\n\n(This is a demo action)`);
}

// Custom Cursor (Desktop Only)
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");
const mouseGlow = document.getElementById("mouse-glow");

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isSmall = window.innerWidth < 1000;

if (!isTouch && !isSmall) {
    window.addEventListener("mousemove", function (e) {
        requestAnimationFrame(() => {
            const posX = e.clientX; const posY = e.clientY;
            cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`; cursorOutline.style.top = `${posY}px`;
            mouseGlow.style.left = `${posX}px`; mouseGlow.style.top = `${posY}px`;
        });
    });
    
    // 3D Tilt
    const cards = document.querySelectorAll('.glass-card, .fee-calculator');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const centerX = rect.width / 2; const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });
}

// Navbar Scroll
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.to("#progress-bar", { width: "100%", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true } });
gsap.to(".bg-lines", { yPercent: -20, ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true } });

const tlHero = gsap.timeline();
tlHero.from(".gs-fade-down", { y: -50, opacity: 0, duration: 1 })
      .from(".gs-title-reveal", { scale: 0.8, opacity: 0, duration: 1 }, "-=0.5")
      .from(".gs-fade-up-delay", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");

gsap.utils.toArray('.section-title').forEach(title => { gsap.from(title, { scrollTrigger: { trigger: title, start: "top 85%" }, opacity: 0, scale: 0.9, duration: 0.8 }); });
gsap.utils.toArray('.gs-fade-up').forEach((elem, i) => { gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 90%" }, y: 50, opacity: 0, duration: 0.6 }); });
gsap.utils.toArray('.gs-reveal-left').forEach(elem => { gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 85%" }, x: -50, opacity: 0, duration: 0.8 }); });
gsap.utils.toArray('.gs-reveal-right').forEach(elem => { gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 85%" }, x: 50, opacity: 0, duration: 0.8 }); });
gsap.utils.toArray('.gs-scale-up').forEach((elem, i) => { gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 90%" }, scale: 0.8, opacity: 0, duration: 0.5 }); });

// Counter Animation
const counters = document.querySelectorAll('.counter-number');
counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const hasPercent = counter.innerText.includes('%');
    ScrollTrigger.create({
        trigger: counter, start: "top 85%",
        onEnter: () => {
            let count = 0; const increment = target / 50;
            const updateCount = () => {
                if(count < target) { count += increment; counter.innerText = Math.ceil(count) + (hasPercent ? '%' : '+'); requestAnimationFrame(updateCount); }
                else { counter.innerText = target + (hasPercent ? '%' : '+'); }
            }; updateCount();
        }
    });
});

// Charts
const ctxPerf = document.getElementById('performanceChart').getContext('2d');
new Chart(ctxPerf, {
    type: 'bar',
    data: {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [{ label: 'Average GPA', data: [3.5, 3.6, 3.8, 3.9], backgroundColor: 'rgba(212, 175, 55, 0.6)', borderColor: '#d4af37', borderWidth: 1 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } }, scales: { y: { ticks: { color: '#8892b0' }, grid: { color: 'rgba(255,255,255,0.05)' } }, x: { ticks: { color: '#8892b0' }, grid: { display: false } } } }
});

const ctxDiv = document.getElementById('diversityChart').getContext('2d');
new Chart(ctxDiv, {
    type: 'doughnut',
    data: {
        labels: ['Science', 'Arts', 'Commerce', 'Sports'],
        datasets: [{ data: [40, 25, 20, 15], backgroundColor: ['rgba(212, 175, 55, 0.8)', 'rgba(17, 34, 64, 0.8)', 'rgba(255, 255, 255, 0.4)', '#8892b0'], borderColor: 'transparent' }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: 'white' } } } }
});

// Background Lines
const bgContainer = document.getElementById('bgLines');
for(let i=0; i<15; i++) {
    let line = document.createElement('div');
    line.classList.add('line');
    line.style.left = Math.random() * 100 + '%';
    line.style.height = (Math.random() * 100 + 50) + 'px';
    line.style.top = (Math.random() * 100) + 'vh';
    line.style.opacity = Math.random() * 0.3;
    bgContainer.appendChild(line);
}