// Player
let playBtn = document.getElementById("play");
let music = document.querySelector("audio");
let isPlaying = false;
let progressContainer = document.querySelector(".progress-container");
let progress = document.querySelector(".progress");

function displayPodcast(PodcastArry, cardcontainer, rowCount, currentPage) {
    cardcontainer.innerHTML = "";
    let end = rowCount * currentPage;
    let start = end - rowCount;

    let sliceArray = PodcastArry.slice(start, end);

    sliceArray.forEach((podcast) => {
        let card = `
      <div class="col-6 col-md-4 my-3 mx-auto">
        <div class="card card-box-imgs h-100">
          <img src="${podcast.podcastImg}" class="card-img-top podcast-img card-box-imgs open-modal" alt="..." />
          <div class="card-body">
            <h5 class="fw-bold card-title">${podcast.podcastName}</h5>
            <p class="mt-2 card-text">${podcast.shortDescription}</p>
          </div>
        </div>
      </div>
    `;

        let cardElement = document.createRange().createContextualFragment(card);
        let cardPodcast = cardElement.querySelector(".open-modal");

        cardPodcast.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(e, podcast);
        });
        cardFragment.append(cardElement);
    });
    cardcontainer.append(cardFragment);
}

function openModal(e, podcast) {
    modalTitle.innerHTML = podcast.podcastName;
    modalAuthor.innerHTML = podcast.publisher;
    modalDescription.innerHTML = podcast.longDescription;

    if (e.target.classList.contains("podcast-img")) {
        const src = e.target.getAttribute("src");
        modalImg.src = src;
        music.src = podcast.path;
        downloadPodcas.href = podcast.path;

        section.style.cssText = "filter: blur(5px);transition:0.3s";

        const myModal = new bootstrap.Modal(
            document.getElementById("podcast-modal")
        );

        myModal.show();
        myModal._element.addEventListener("hidden.bs.modal", function() {
            pauseSong();
            progress.style.width = 0;
            section.style.filter = "none";
        });
    }
}

function setUpPagenation(PodcastArry, pagination, rowCount) {
    pagination.innerHTML = "";
    let pageCount = Math.ceil(PodcastArry.length / rowCount);
    for (let i = 1; i < pageCount + 1; i++) {
        let btn = buttonGenerator(i, PodcastArry);
        pagination.append(btn);
    }
}

function buttonGenerator(page, PodcastArry) {
    let button = document.createElement("button");
    button.innerHTML = page;

    if (page === currentPage) {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {
        currentPage = page;
        displayPodcast(PodcastArry, cardRow, rowCount, currentPage);

        window.scrollTo({
            top: 620,
            behavior: "smooth",
        });

        let prevPage = document.querySelector("button.active");
        prevPage.classList.remove("active");
        button.classList.add("active");
    });
    return button;
}

function playSong() {
    isPlaying = true;
    playBtn.setAttribute("src", "./image/pause.png");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.setAttribute("src", "./image/play.png");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

function changeState() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function updateProgressBar(e) {
    if (isPlaying) {
        let duration = e.srcElement.duration;
        let currentTime = e.srcElement.currentTime;
        let progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + "%";
    }
}

function setProgressBar(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = music.duration;
    music.currentTime = (clickX / width) * duration;
    playSong();
}

displayPodcast(PodcastArry, cardRow, rowCount, currentPage);
setUpPagenation(PodcastArry, pagination, rowCount);

playBtn.addEventListener("click", changeState);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);