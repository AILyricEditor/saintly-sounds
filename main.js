console.log("Hello World!");

const myVar = 5;
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function myFunction() {
	console.log("hello world!");
	if(myVar >= 5) {
		console.log("Higher than value");
	} else if(myVar <= 5) {
		console.log("Lower than value");
	}
}

class MyClass {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y =y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	drawObject() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fill();
	}
}

const block = new MyClass(100, 100, 300, 500, "green");
block.drawObject();

window.requestAnimationFrame(() => {
	block.x += 1;
	block.y -= 1;
});

const myMessage = `
my message
`;

console.log(myMessage);