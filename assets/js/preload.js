// Lista de rutas de imágenes en tus activos
const imagePaths = [
  "assets/img/day/clear.avif",
  "assets/img/day/cloudy.avif",
  "assets/img/day/rainy.avif",
  "assets/img/day/snowy.avif",
  "assets/img/night/clear.avif",
  "assets/img/night/cloudy.avif",
  "assets/img/night/rainy.avif",
  "assets/img/night/snowy.avif",
];

// Función para precargar imágenes
function preloadImages(paths, callback) {
  let loadedImages = 0;
  const totalImages = paths.length;

  // Callback que se ejecutará cuando todas las imágenes estén precargadas
  function imagesLoaded() {
    loadedImages++;
    if (loadedImages === totalImages) {
      callback();
    }
  }

  // Precargar cada imagen
  paths.forEach((path) => {
    const img = new Image();
    img.src = path;
    img.onload = imagesLoaded;
    img.onerror = imagesLoaded; // Manejar errores de carga de imagen
  });
}

// Precargar imágenes y luego inicializar tu aplicación
preloadImages(imagePaths, function () {
  console.log("Todas las imágenes están precargadas. Puedes utilizar tu aplicación ahora.");
});
