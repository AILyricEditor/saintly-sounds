const menuButtons = document.querySelectorAll(".menu-button");
const menu = document.getElementById("menu");
// const overlay = document.getElementById("overlay");

menuButtons.forEach(button => {
	button.addEventListener("click", () => {
		// overlay.classList.toggle("darken");
		button.classList.toggle("rotate-icon");
		menu.classList.toggle("menu-slide");
	});
});

// menu.addEventListener("click", () => {
// 	menu.classList.toggle("menu-slide");
// });