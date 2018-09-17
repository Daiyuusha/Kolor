// Variables
var numCircles = 6;
var colors = randomColorGenerator(numCircles);
var pickedColor = pickColor();

// Selectors

// *Circles
var circles = document.querySelectorAll(".circle")

// *RGB color to guess
var colorDisplay = document.querySelector("#colorDisplay")
colorDisplay.textContent = pickedColor;

// *Try again/Correct!
var statusDisplay = document.querySelector("#statusDisplay");

// *Reset Button
var resetButton = document.querySelector("#reset");

// *Mode Buttons
var modeButtons = document.querySelectorAll(".mode");

// *mainTitle and menu
var mainTitle = document.querySelector("#mainTitle");
var kolorTitle = document.querySelector("#kolorTitle");
var menu = document.querySelector("#menu");
var kolorBody = document.querySelector("#kolorBody");
var body = document.querySelector("body");
var randomContinue = true;




// THIS IS EVERYTHING
mode();
button();
setInterval(kolorChange, 2500);
// THIS IS EVERYTHING


// Reset Button functions
resetButton.addEventListener("click", function() {
	reset();
})


// functions
// *Individual rgb generator
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
	return rgb
}

// *Array rgb generator
function randomColorGenerator(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr
}

// *Color 1/6 or 1/3 picker
function pickColor() {
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

// *Updating 6 circles when answer is correct
function correct(rgbColor) {
	for(var i = 0; i < circles.length; i++) {
		circles[i].style.backgroundColor = rgbColor;
	}
	statusDisplay.textContent = "Correct!";
	resetButton.textContent = "play again?"
	mainTitle.style.backgroundColor = rgbColor;
}

// *Reset Function
function reset() {
	colors = randomColorGenerator(numCircles);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	statusDisplay.textContent = "";
	resetButton.textContent = "new colors";
	mainTitle.style.backgroundColor = "#3FB54F"

	for(var i = 0; i < circles.length; i++) {
		if(colors[i]) {
			circles[i].style.display = "block";
			circles[i].style.backgroundColor = colors[i];
		}
		else {
			circles[i].style.display = "none";
		}
	}
}

// *Mode button
function mode() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "easy") {
				numCircles = 3;
			}
			else {
				numCircles = 6;
			}
			reset();
		})
	}
}

// *Button function
function button() {
	//Processses or win condition
	for(var i = 0; i < circles.length; i++) {
		circles[i].style.backgroundColor = colors[i];

		circles[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor

			if(clickedColor === pickedColor) {
				correct(clickedColor);
			}
			else {
				this.style.backgroundColor = "#c3c3c3";
				statusDisplay.textContent = "Try again!";
			}
		})
	}
}

// *Continuous color change
function kolorChange() {
		kolorTitle.style.color = randomColor();
		statusDisplay.style.color = kolorTitle.style.color;
		menu.style.backgroundColor = kolorTitle.style.color;
		menu.style.transition = "all 2.5s";

	if(randomContinue === true) {
		body.style.backgroundColor = kolorTitle.style.color;
		body.style.transition = "all 2.5s"
	}
	else {
			body.style.backgroundColor = "#c3c3c3"
	}
}

// *Menu
menu.addEventListener("click", function() {
	this.style.display = "none";
	kolorBody.style.visibility = "visible";
	randomContinue = false;

})
