const menuButtons = document.querySelectorAll(".menu-button");
const menu = document.getElementById("menu");

menuButtons.forEach(button => {
	button.addEventListener("click", () => {
		// overlay.classList.toggle("darken");
		button.classList.toggle("rotate-icon");
		menu.classList.toggle("menu-slide");
	});
});

document.querySelector('.music-card').addEventListener('click', function(e) {
  const card = e.target.closest(".music-card"); // Find the closest .music-card element
  console.log(e.target);

  if (!e.target.matches(".play")) {
    card.classList.toggle("expanded");
  }

  const playButton = card.querySelector(".play-button"); // Find the play button inside the card
  if (e.target.matches(".play")) {
    e.stopPropagation(); // Stop the event from bubbling up

    const song = document.querySelector(".song-audio");
    if (song.paused) {
      song.play();
      playButton.innerHTML = '<svg class="play" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 26 26"><path fill="currentColor" d="M7 5c-.551 0-1 .449-1 1v14c0 .551.449 1 1 1h3c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1H7zm9 0c-.551 0-1 .449-1 1v14c0 .551.449 1 1 1h3c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1h-3z"/></svg>';
    } else {
      song.pause();
      playButton.innerHTML = '<svg class="play" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="currentColor" d="M15.544 9.59a1 1 0 0 1-.053 1.728L6.476 16.2A1 1 0 0 1 5 15.321V4.804a1 1 0 0 1 1.53-.848l9.014 5.634Z"/></svg>';
    }

    console.log('play');
  }
});
