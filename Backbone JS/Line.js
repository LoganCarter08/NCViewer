class line {
	constructor(line, colors, endingX, endingY) {
		this.className = "line";
		this.lineNum = line;
		this.color = colors;
		this.endX = endingX;
		this.endY = endingY;
	}
	
	action(j) {
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.strokeStyle = this.color;
		ctx.moveTo(listOfCommands[j - 1].endX * scale, listOfCommands[j - 1].endY * scale);
		ctx.lineTo(this.endX * scale, this.endY * scale);
		ctx.stroke();
		ctx.closePath();
		//console.log(this.endX + "   " + this.endY);
	}
}