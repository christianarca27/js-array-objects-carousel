const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];



// Inizializzo la struttura principale del carosello
const carouselEl = document.getElementById("carousel");
// Inizializzo la struttura principale della main-picture
const mainPictureEl = document.createElement("div");
mainPictureEl.id = "main-picture";
carouselEl.append(mainPictureEl);
// Inizializzo l'immagine della main-picture
const mainPictureImageEl = document.createElement("img");
mainPictureImageEl.id = "image";
mainPictureEl.append(mainPictureImageEl);
// Inizializzo il campo descrizione della main-picture
const mainPictureDescriptionEl = document.createElement("div");
mainPictureDescriptionEl.id = "description";
mainPictureEl.append(mainPictureDescriptionEl);
// Inizializzo il titolo della main-picture
const mainPictureTitleEl = document.createElement("div");
mainPictureTitleEl.id = "title";
mainPictureDescriptionEl.append(mainPictureTitleEl);
// Inizializzo il testo descrittivo della main-picture
const mainPictureTextEl = document.createElement("div");
mainPictureTextEl.id = "text";
mainPictureDescriptionEl.append(mainPictureTextEl);



// Inizializzo la struttura che contiene le thumbnails
const thumbnailsEl = document.createElement("div");
thumbnailsEl.id = "thumbnails";
carouselEl.append(thumbnailsEl);
// Inizializzo la lista delle thumbnails
const thumbnailsList = [];
for(let i = 0; i < images.length; i++) {
    // Creo e stilizzo la singola thumbnail
    const thumbnailEl = document.createElement("div");
    thumbnailEl.classList.add("thumbnail");
    thumbnailEl.style.height = "calc(100% / " + images.length + ")";
    thumbnailsEl.append(thumbnailEl);
    // Creo l'immagine contenuta nella thumbnail
    const thumbnailImageEl = document.createElement("img");
    thumbnailImageEl.src = "../" + images[i].image;
    thumbnailEl.append(thumbnailImageEl);
    // Al click sulla thumbnail diventa la main-picture
    thumbnailEl.addEventListener("click", () => {
        actualIndex = i;
        showImageByIndex();
    });
    // Aggiungo la thumbnail creata alla lista di thumbnails
    thumbnailsList.push(thumbnailEl);
}



// Creo il bottone per passare all'immagine precedente
const controlPrevEl = document.createElement("i");
controlPrevEl.id = "control-prev";
controlPrevEl.className = "fa-solid fa-circle-chevron-up fa-2xl";
thumbnailsEl.append(controlPrevEl);
controlPrevEl.addEventListener("click", showPrevImage);



// Creo il bottone per passare all'immagine succesiva
const controlNextEl = document.createElement("i");
controlNextEl.id = "control-next";
controlNextEl.className = "fa-solid fa-circle-chevron-down fa-2xl";
thumbnailsEl.append(controlNextEl);
controlNextEl.addEventListener("click", showNextImage);



// Creo il bottone per avviare lo switch automatico del carosello ogni 3 secondi
const controlStartEl = document.createElement("i");
controlStartEl.id = "control-start";
controlStartEl.className = "fa-solid fa-circle-play fa-2xl";
controlStartEl.style.display = "none";
mainPictureEl.append(controlStartEl);
controlStartEl.addEventListener("click", () => {
    if(!isIntervalActive) {
        nextImageInterval = setInterval(() => {
            if(!isReverseRotation) {
                showNextImage();
            }
            else {
                showPrevImage();
            }
        }, 3000);
        isIntervalActive = true;
    }

    controlStartEl.style.display = "none";
    controlStopEl.style.display = "block";
});



// Creo il bottone per fermare lo switch automatico del carosello ogni 3 secondi
const controlStopEl = document.createElement("i");
controlStopEl.id = "control-stop";
controlStopEl.className = "fa-solid fa-circle-pause fa-2xl";
mainPictureEl.append(controlStopEl);
controlStopEl.addEventListener("click", () => {
    if(isIntervalActive){
        clearInterval(nextImageInterval);
        isIntervalActive = false;
    }

    controlStopEl.style.display = "none";
    controlStartEl.style.display = "block";
});


// Creo il bottone per cambiare il senso di rotazione automatica del carosello
const controlChangeEl = document.createElement("i");
controlChangeEl.id = "control-change";
controlChangeEl.className = "fa-solid fa-arrows-rotate fa-2xl";
mainPictureEl.append(controlChangeEl);
controlChangeEl.addEventListener("click", () => {
    isReverseRotation = !isReverseRotation;

    if(isIntervalActive) {
        clearInterval(nextImageInterval);

        nextImageInterval = setInterval(() => {
            if(!isReverseRotation) {
                showNextImage();
            }
            else {
                showPrevImage();
            }
        }, 3000);
        isIntervalActive = true;
    }
});


// Inizializzo il carosello
let isReverseRotation = false;
let nextImageInterval = setInterval(showNextImage, 3000);
let isIntervalActive = true;
let actualIndex = 0;
showImageByIndex();

// ------------------- FUNCTIONS ------------------- //

function showPrevImage() {
    actualIndex--;
    actualIndex += images.length;
    actualIndex %= images.length;

    showImageByIndex();
}

function showNextImage() {
    actualIndex++;
    actualIndex %= images.length;

    showImageByIndex();
}

function showImageByIndex() {
    mainPictureImageEl.src = "../" + images[actualIndex].image;
    mainPictureTitleEl.innerText = images[actualIndex].title;
    mainPictureTextEl.innerText = images[actualIndex].text;

    thumbnailsList.forEach((currentThumbnail, index) => {
        if(index == actualIndex) {
            currentThumbnail.classList.add("active");
        }
        else {
            currentThumbnail.classList.remove("active");
        }
    });
}