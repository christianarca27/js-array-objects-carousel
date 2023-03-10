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

const carouselEl = document.getElementById("carousel");

const mainPictureEl = document.createElement("div");
mainPictureEl.id = "main-picture";
carouselEl.append(mainPictureEl);

const controlStartEl = document.createElement("i");
controlStartEl.id = "control-start";
controlStartEl.className = "fa-solid fa-circle-play fa-2xl";
controlStartEl.style.display = "none";
mainPictureEl.append(controlStartEl);

const controlStopEl = document.createElement("i");
controlStopEl.id = "control-stop";
controlStopEl.className = "fa-solid fa-circle-pause fa-2xl";
mainPictureEl.append(controlStopEl);

const controlChangeEl = document.createElement("i");
controlChangeEl.id = "control-change";
controlChangeEl.className = "fa-solid fa-arrows-rotate fa-2xl";
mainPictureEl.append(controlChangeEl);

const mainPictureImageEl = document.createElement("img");
mainPictureImageEl.id = "image";
mainPictureEl.append(mainPictureImageEl);

const mainPictureDescriptionEl = document.createElement("div");
mainPictureDescriptionEl.id = "description";
mainPictureEl.append(mainPictureDescriptionEl);

const mainPictureTitleEl = document.createElement("div");
mainPictureTitleEl.id = "title";
mainPictureDescriptionEl.append(mainPictureTitleEl);

const mainPictureTextEl = document.createElement("div");
mainPictureTextEl.id = "text";
mainPictureDescriptionEl.append(mainPictureTextEl);

const thumbnailsEl = document.createElement("div");
thumbnailsEl.id = "thumbnails";
carouselEl.append(thumbnailsEl);

for(let i = 0; i < images.length; i++) {
    const thumbnailEl = document.createElement("div");
    thumbnailEl.classList.add("thumbnail");
    thumbnailEl.style.height = "calc(100% / " + images.length + ")";
    thumbnailsEl.append(thumbnailEl);

    const thumbnailImageEl = document.createElement("img");
    thumbnailImageEl.src = "../" + images[i].image;
    thumbnailEl.append(thumbnailImageEl);
}

const controlPrevEl = document.createElement("i");
controlPrevEl.id = "control-prev";
controlPrevEl.className = "fa-solid fa-circle-chevron-up fa-2xl";
thumbnailsEl.append(controlPrevEl);

const controlNextEl = document.createElement("i");
controlNextEl.id = "control-next";
controlNextEl.className = "fa-solid fa-circle-chevron-down fa-2xl";
thumbnailsEl.append(controlNextEl);

const thumbnailsList = document.querySelectorAll(".thumbnail");
thumbnailsList.forEach((actualThumbnail, thumbnailIndex) => {
    actualThumbnail.addEventListener("click", () => {
        actualIndex = thumbnailIndex;
        showImageByIndex(actualIndex);
    });
});

let actualIndex = 0;
showImageByIndex(actualIndex);

let isReverseRotation = false;
let nextImageInterval = setInterval(showNextImage, 3000);
let isIntervalActive = true;


controlPrevEl.addEventListener("click", showPrevImage);


controlNextEl.addEventListener("click", showNextImage);


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


controlStopEl.addEventListener("click", () => {
    if(isIntervalActive){
        clearInterval(nextImageInterval);
        isIntervalActive = false;
    }

    controlStopEl.style.display = "none";
    controlStartEl.style.display = "block";
});


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





// ------------------- FUNCTIONS ------------------- //

function showPrevImage() {
    actualIndex--;
    actualIndex += images.length;
    actualIndex %= images.length;

    showImageByIndex(actualIndex);
}

function showNextImage() {
    actualIndex++;
    actualIndex %= images.length;

    showImageByIndex(actualIndex);
}

function showImageByIndex(i) {
    mainPictureImageEl.src = "../" + images[i].image;
    mainPictureTitleEl.innerText = images[i].title;
    mainPictureTextEl.innerText = images[i].text;

    thumbnailsList.forEach((currentThumbnail, index) => {
        if(index == i) {
            currentThumbnail.classList.add("active");
        }
        else {
            currentThumbnail.classList.remove("active");
        }
    });
}