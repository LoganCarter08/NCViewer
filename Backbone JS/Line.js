class line {
	constructor(line, endingX, endingY) {
		this.className = "line";
		this.lineNum = line;
		this.color = getColor();
		this.endX = endingX;
		this.endY = endingY;
	}
	
	action(j) {
		if (isNaN(this.endX)){
			this.endX = listOfCommands[j - 1].endX;
		}
		
		if (isNaN(this.endY)){
			this.endY = listOfCommands[j - 1].endY;
		}
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.strokeStyle = this.color;
		ctx.moveTo(listOfCommands[j - 1].endX * (scale / unitScale), listOfCommands[j - 1].endY * (scale / unitScale));
		ctx.lineTo(this.endX * (scale / unitScale), this.endY * (scale / unitScale));
		ctx.stroke();
		ctx.closePath();
		//console.log(this.endX + "   " + this.endY);
	}
}