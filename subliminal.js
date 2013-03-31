
var defaultSubliminalParameters = {
	framePeriod: 30 /* milliseconds between each frame */,
	font: '190px Arial',
	textcolor: "rgba(0.9,0.9,0.9,0.9)",
	rightMargin: 200,
	topMargin: 100,
	displayProbability: 0.58,
	moveProbability: 0.08,
	messageProbability: 0.08,
	zindex: -10000,
};


function addSubliminal(messages, p) {
	var root = document.body;
	var canvas = document.createElement('canvas');
	canvas.setAttribute('style', 'position: fixed; pointer-events: none; z-index: ' + p.zindex);
	root.insertBefore(canvas, root.firstChild);

	var message = '';
	var x = 0, y = 0;

	function update() {
		var width = document.body.clientWidth;
		var height = document.body.clientHeight

		canvas.width = width;
		canvas.height = height;

		var ctx = canvas.getContext("2d");

		// Clear the screen
		ctx.font = p.font;
		ctx.clearRect(0,0,width,height);

		if ((Math.random() < p.messageProbability) || (message == '')) {
			message = messages[parseInt(Math.random() * messages.length)];
		}
		if ((Math.random() < p.moveProbability) || ((x == 0) && (y==0))) {
			x = Math.random()*(width-p.rightMargin);
			y = Math.random()*(height-p.topMargin)+p.topMargin;
		}	
		if (Math.random() < p.displayProbability) {
			// Display the text in the new position
			ctx.fillStyle = p.textcolor;
			ctx.fillText(message, x, y);
		}
	}

	if (canvas.getContext) {
		setInterval(update, p.framePeriod)
	}
}

