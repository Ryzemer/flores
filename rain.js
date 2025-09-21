// ===== EFECTO DE LLUVIA =====
function initRainEffect() {
    const rainContainer = document.getElementById('rainContainer');
    let rainInterval = null;
    let isRaining = false;
    
    // Función para crear una gota de lluvia
    function createRaindrop() {
        if (!isRaining) return;
        
        const raindrop = document.createElement('div');
        raindrop.classList.add('raindrop');
        
        // Posición y velocidad aleatorias
        const posX = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = 0.5 + Math.random() * 1.5;
        const size = 0.5 + Math.random() * 1.5;
        const opacity = 0.3 + Math.random() * 0.4;
        
        // Aplicar estilos
        raindrop.style.left = `${posX}px`;
        raindrop.style.animationDelay = `${delay}s`;
        raindrop.style.animationDuration = `${duration}s`;
        raindrop.style.height = `${15 * size}px`;
        raindrop.style.width = `${1 * size}px`;
        raindrop.style.opacity = opacity;
        
        // Añadir al contenedor
        rainContainer.appendChild(raindrop);
        
        // Eliminar la gota después de que termine su animación
        setTimeout(() => {
            if (raindrop.parentNode) {
                raindrop.remove();
            }
        }, (delay + duration) * 1000);
        
        // Crear efecto de ondas al impactar
        createRippleEffect(posX, delay, duration);
    }
    
    // Crear efecto de ondas al impactar
    function createRippleEffect(posX, delay, duration) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Posición en la parte inferior
        ripple.style.left = `${posX}px`;
        ripple.style.bottom = '0';
        ripple.style.animationDelay = `${delay + duration - 0.2}s`;
        
        rainContainer.appendChild(ripple);
        
        // Eliminar el elemento después de la animación
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, (delay + duration) * 1000);
    }
    
    // Iniciar la lluvia
    function startRain() {
        isRaining = true;
        rainContainer.style.display = 'block';
        
        // Crear gotas iniciales
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createRaindrop(), i * 100);
        }
        
        // Continuar creando gotas
        rainInterval = setInterval(() => {
            if (document.hidden) return; // Pausar cuando la pestaña no está visible
            createRaindrop();
        }, 50);
    }
    
    // Detener la lluvia
    function stopRain() {
        isRaining = false;
        
        if (rainInterval) {
            clearInterval(rainInterval);
            rainInterval = null;
        }
        
        // Limpiar todas las gotas existentes
        rainContainer.innerHTML = '';
    }
    
    // Iniciar automáticamente al cargar
    startRain();
    
    // Pausar la lluvia cuando la pestaña no es visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isRaining) {
            stopRain();
            // Reiniciar cuando la pestaña vuelva a ser visible
            document.addEventListener('visibilitychange', function restartRain() {
                if (!document.hidden) {
                    startRain();
                    document.removeEventListener('visibilitychange', restartRain);
                }
            });
        }
    });
    
    // Reajustar la lluvia al redimensionar la ventana
    window.addEventListener('resize', () => {
        if (isRaining) {
            stopRain();
            startRain();
        }
    });
}

// Inicializar el efecto de lluvia cuando el documento esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRainEffect);
} else {
    initRainEffect();
}
