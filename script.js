// ================================================================
// 💝 PÁGINA NAVIDEÑA PREMIUM PARA ARANZA 💝
// JavaScript con animaciones garantizadas y efectos especiales
// ================================================================

console.log('%c🎄 Feliz Navidad Aranza 💕', 'color: #C41E3A; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cEsta página fue creada con todo mi amor para ti ✨', 'color: #FFD700; font-size: 18px; font-style: italic;');

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🎄 Inicializando página navideña...');

    // Inicializar todas las funciones
    initSnowCanvas();
    initModal();
    initScrollAnimations();
    initTiltEffect();
    initCursor();
    initFloatingHearts();
    initParticles();

    console.log('✨ Página lista!');
});

// ========================================
// NIEVE ANIMADA CON CANVAS
// ========================================
function initSnowCanvas() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Ajustar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear copos de nieve
    const snowflakes = [];
    const numberOfSnowflakes = 100;

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.radius = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.5;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.4;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            // Si el copo sale de la pantalla, reiniciarlo
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }

            if (this.x > canvas.width) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();

            // Añadir brillo
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        }
    }

    // Crear todos los copos
    for (let i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }

    // Animar
    function animateSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        requestAnimationFrame(animateSnow);
    }

    animateSnow();
    console.log('❄️ Nieve iniciada con', numberOfSnowflakes, 'copos');
}

// ========================================
// PARTÍCULAS DE FONDO
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Crear partículas brillantes
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
        `;
        particlesContainer.appendChild(particle);
    }

    // Añadir animación CSS si no existe
    if (!document.getElementById('particle-animation-style')) {
        const style = document.createElement('style');
        style.id = 'particle-animation-style';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-50px) translateX(30px);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('✨ Partículas de fondo creadas');
}

// ========================================
// MODAL MEJORADO
// ========================================
function initModal() {
    const modal = document.getElementById('surpriseModal');
    const btn = document.getElementById('specialButton');
    const closeBtn = document.querySelector('.close-modal-btn');

    if (!modal || !btn) return;

    // Abrir modal
    btn.addEventListener('click', function () {
        modal.classList.add('active');
        modal.style.display = 'flex';
        playConfetti();
        playSoundEffect();
        console.log('🎁 Regalo abierto!');
    });

    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// CONFETI ANIMADO
// ========================================
function playConfetti() {
    const colors = [
        '#FFD700', '#C41E3A', '#165B33', '#FF69B4',
        '#FFA500', '#FF1493', '#00FF00', '#FFFFFF'
    ];

    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(colors);
        }, i * 20);
    }
}

function createConfettiPiece(colors) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * window.innerWidth;

    confetti.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${startX}px;
        top: -20px;
        z-index: 100000;
        pointer-events: none;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        transform: rotate(${Math.random() * 360}deg);
    `;

    document.body.appendChild(confetti);

    // Animar caída
    let posY = -20;
    let posX = startX;
    let rotation = Math.random() * 360;
    const fallSpeed = Math.random() * 3 + 2;
    const windSpeed = Math.random() * 2 - 1;
    const rotationSpeed = Math.random() * 10 - 5;

    function animateConfetti() {
        posY += fallSpeed;
        posX += windSpeed;
        rotation += rotationSpeed;

        confetti.style.top = posY + 'px';
        confetti.style.left = posX + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;

        if (posY < window.innerHeight + 50) {
            requestAnimationFrame(animateConfetti);
        } else {
            confetti.remove();
        }
    }

    animateConfetti();
}

// ========================================
// EFECTO DE SONIDO MÁGICO
// ========================================
function playSoundEffect() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        // Crear una secuencia de tonos mágicos
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];

        notes.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    } catch (error) {
        console.log('Audio no disponible');
    }
}

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .glass-card-premium, 
        .memory-card-premium, 
        .wish-card,
        .section-header
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(60px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    console.log('📜 Animaciones de scroll inicializadas para', animatedElements.length, 'elementos');
}

// ========================================
// EFECTO TILT EN TARJETAS
// ========================================
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function (e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-20px) 
                scale(1.05)
            `;
        });

        element.addEventListener('mouseleave', function () {
            element.style.transform = '';
        });
    });

    console.log('🎴 Efecto tilt aplicado a', tiltElements.length, 'tarjetas');
}

// ========================================
// CURSOR PERSONALIZADO
// ========================================
function initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99999;
        transition: all 0.15s ease;
        mix-blend-mode: difference;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cambiar tamaño en hover de elementos interactivos
    const interactiveElements = document.querySelectorAll('button, a, .memory-card-premium, .wish-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.borderColor = '#C41E3A';
            cursor.style.borderWidth = '3px';
        });

        element.addEventListener('mouseleave', function () {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.borderColor = '#FFD700';
            cursor.style.borderWidth = '2px';
        });
    });

    console.log('🖱️ Cursor personalizado activado');
}

// ========================================
// CORAZONES FLOTANTES
// ========================================
function initFloatingHearts() {
    setInterval(() => {
        createFloatingHeart();
    }, 4000);
}

function createFloatingHeart() {
    const hearts = ['💖', '💝', '💗', '💓', '💕', '❤️', '💞'];
    const heart = document.createElement('div');

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        bottom: -60px;
        font-size: ${Math.random() * 30 + 30}px;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 3 + 4}s ease-out forwards;
    `;

    document.body.appendChild(heart);

    // Añadir animación CSS si no existe
    if (!document.getElementById('float-up-animation')) {
        const style = document.createElement('style');
        style.id = 'float-up-animation';
        style.textContent = `
            @keyframes floatUp {
                0% {
                    bottom: -60px;
                    opacity: 0;
                    transform: translateX(0) rotate(0deg);
                }
                20% {
                    opacity: 1;
                }
                80% {
                    opacity: 1;
                }
                100% {
                    bottom: 110vh;
                    opacity: 0;
                    transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

// ========================================
// EFECTO DE CLICK - PARTÍCULAS
// ========================================
document.addEventListener('click', function (e) {
    createClickParticles(e.clientX, e.clientY);
});

function createClickParticles(x, y) {
    const particleCount = 12;
    const colors = ['#FFD700', '#C41E3A', '#FFFFFF', '#FF69B4', '#FFA500'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 100000;
            box-shadow: 0 0 10px ${color};
        `;

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 80;
        let posX = x;
        let posY = y;
        let velocityX = Math.cos(angle) * velocity;
        let velocityY = Math.sin(angle) * velocity;
        let opacity = 1;

        function animateParticle() {
            velocityY += 3; // Gravedad
            posX += velocityX * 0.05;
            posY += velocityY * 0.05;
            velocityX *= 0.98;
            opacity -= 0.02;

            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }

        animateParticle();
    }
}

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CAMBIO DE TÍTULO CUANDO PIERDE FOCO
// ========================================
const originalTitle = document.title;

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        document.title = '💕 ¡Vuelve! Te extraño 💕';
    } else {
        document.title = originalTitle;
    }
});

// ========================================
// EASTER EGG - CÓDIGO KONAMI
// ========================================
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        activateSecretMode();
        konamiCode = [];
    }
});

function activateSecretMode() {
    console.log('🎁 ¡CÓDIGO SECRETO ACTIVADO!');

    // Crear mensaje especial
    const secretMessage = document.createElement('div');
    secretMessage.innerHTML = `
        <h2 style="font-size: 3rem; margin-bottom: 1rem;">🎁 ¡Código Secreto Encontrado! 💝</h2>
        <p style="font-size: 1.5rem; margin-bottom: 1rem;">¡Eres increíble, Aranza!</p>
        <p style="font-size: 2rem; font-family: 'Dancing Script', cursive;">Te amo con todo mi corazón 💖✨</p>
    `;

    secretMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #C41E3A, #8B0000);
        color: white;
        padding: 4rem;
        border-radius: 30px;
        text-align: center;
        z-index: 1000000;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    document.body.appendChild(secretMessage);

    // Lluvia masiva de corazones
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 30);
    }

    // Confeti extra
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const colors = ['#FFD700', '#C41E3A', '#FF69B4', '#FFA500', '#FFFFFF'];
            createConfettiPiece(colors);
        }, i * 20);
    }

    // Quitar mensaje después de 6 segundos
    setTimeout(() => {
        secretMessage.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            secretMessage.remove();
        }, 500);
    }, 6000);
}

// Añadir animación bounce
if (!document.getElementById('bounce-animation')) {
    const style = document.createElement('style');
    style.id = 'bounce-animation';
    style.textContent = `
        @keyframes bounceIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// LOG FINAL
// ========================================
console.log('🎄✨ Todos los sistemas navideños están funcionando perfectamente! 💕');
console.log('💝 ¡Feliz Navidad, Aranza! 🎄');
