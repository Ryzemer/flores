// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
  { text: "Love.", time: 140 },
];

// Animar las letras


function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    if (lyrics.innerHTML !== currentLine.text) {
      lyrics.innerHTML = currentLine.text;
    }
    lyrics.style.opacity = 1; // fade-in automático con transition
  } else {
    if (lyrics.style.opacity != 0) {
      lyrics.style.opacity = 0; // fade-out
      setTimeout(() => {
        if (lyrics.style.opacity == 0) {
          lyrics.innerHTML = ""; // limpiar después del desvanecimiento
        }
      }, 1500); // mismo tiempo que el transition
    }
  }
}


setInterval(updateLyrics, 1000);

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.classList.add("fade-out"); // activa la transición

  // esperar a que acabe la transición y recién ocultar
  setTimeout(function () {
    titulo.style.display = "none";
  }, 1500); // mismo tiempo que el transition
}

// Función para centrar elementos en móviles
function centerMobileElements() {
  const isMobile = window.innerWidth <= 600;
  const flowers = document.querySelector('.flowers');
  const lyrics = document.getElementById('lyrics');
  const titulo = document.querySelector('.titulo');
  
  if (isMobile && flowers) {
    // Centrar las flores
    flowers.style.position = 'relative';
    flowers.style.left = '0';
    flowers.style.transform = 'scale(0.8)';
    
    // Ajustar posición de letras
    if (lyrics) {
      lyrics.style.position = 'fixed';
      lyrics.style.bottom = '20%';
      lyrics.style.left = '50%';
      lyrics.style.transform = 'translateX(-50%)';
      lyrics.style.width = '90%';
      lyrics.style.textAlign = 'center';
    }
    
    // Ajustar posición del título
    if (titulo) {
      titulo.style.position = 'fixed';
      titulo.style.top = '10%';
      titulo.style.left = '50%';
      titulo.style.transform = 'translateX(-50%)';
      titulo.style.width = '90%';
      titulo.style.textAlign = 'center';
    }
  }
}

// Centrar elementos al cargar y redimensionar
window.addEventListener('load', centerMobileElements);
window.addEventListener('resize', centerMobileElements);
window.addEventListener('orientationchange', function() {
  setTimeout(centerMobileElements, 100);
});

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 3000);