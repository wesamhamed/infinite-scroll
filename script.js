const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Unsplash Api
let count = 3;
const apiKey = 'kTMlcoILr6RWLyUlNsYqFdIv8g7cZJbcYa37FuFqilE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
// Create Elements for links & photos,Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement("a");
        setAttributes(item, {
            "href": photo.links.html,
            "target": "_blank"
        });

        const img = document.createElement("img");
        setAttributes(img, {
            "src": photo.urls.regular,
            "alt": photo.alt_description,
            "title": photo.alt_description
        });
        img.addEventListener("load", imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item)
    })
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// Check to see if scrolling near bottom of page,Load more pages
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()
    }
})
getPhotos();