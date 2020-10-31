var origin = 0; // 0 = bottom left 
var scale = 15; // how zoomed in we start with
var currentColor = "black"; // color to set the line. black by default. 
var arcCenter = 1; // 1 for incremental, 0 for absolute
var punchToolAngle = 0; // this really shouldn't be here. Why'd I do that?
var unitScale = 1;

function setImperial() {
	unitScale = 1;
}

function setMetric() {
	unitScale = 25.4;
}

function setArcCenterAbs() {
	this.arcCenter = 0;
}

function setArcCenterInc() {
	this.arcCenter = 1;
}

function setColor(col) {
	this.currentColor = col;
}

function getColor() {
	return currentColor;
}