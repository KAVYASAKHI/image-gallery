document.addEventListener("DOMContentLoaded", () => {
    loadImages();
});

const categories = [
    "beaches", "cities", "deserts", "flowers", "forests",
    "mountains", "oceans", "sunset", "waterfalls", "wildlife"
];

let images = []; // Store all image paths
let currentIndex = 0;
let slideshowInterval = null;

function loadImages() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    images = []; // Reset image list

    categories.forEach(category => {
        for (let i = 1; i <= 8; i++) { // Assuming 5 images per category
            const imgPath = `images/${category}/${i}.jpg`;
            images.push(imgPath);

            const img = document.createElement("img");
            img.src = imgPath;
            img.classList.add("gallery-item", category);
            img.onclick = () => openLightbox(images.indexOf(imgPath));
            gallery.appendChild(img);
        }
    });
}

function filterImages(category) {
    document.querySelectorAll(".gallery-item").forEach(img => {
        img.style.display = category === "all" || img.classList.contains(category) ? "block" : "none";
    });
}

function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-image").src = images[currentIndex];
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
    stopSlideshow();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById("lightbox-image").src = images[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById("lightbox-image").src = images[currentIndex];
}

function toggleSlideshow() {
    slideshowInterval ? stopSlideshow() : slideshowInterval = setInterval(nextImage, 3000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
}
