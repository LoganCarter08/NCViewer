class punchRect {
	constructor(line, ident, colors, centX, centY, len, wid) {
		this.className = "punchRect";
		this.lineNum = line;
		this.color = colors;
		this.endX = centX - (len / 2);
		this.endY = centY - (wid / 2);
		this.length = len;
		this.width = wid;
		this.id = ident;
	}
	
	action(j) {
		//console.log(this.endX + "   " + this.endY);
		
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.setLineDash([5,3]);
		if (listOfCommands[j - 1].className == "punchRect") {
			ctx.moveTo((listOfCommands[j - 1].endX + (listOfCommands[j - 1].length / 2))* scale, (listOfCommands[j - 1].endY + (listOfCommands[j - 1].width / 2)) * scale);
		} else if (listOfCommands[j - 1].className == "punchCirc") {
			ctx.moveTo((listOfCommands[j - 1].endX + (listOfCommands[j - 1].radius))* scale, (listOfCommands[j - 1].endY + (listOfCommands[j - 1].radius)) * scale);
		} else {
			ctx.moveTo(listOfCommands[j - 1].endX * scale, listOfCommands[j - 1].endY * scale);
		}
		
		ctx.lineTo((this.endX + (this.length / 2))* scale, (this.endY + (this.width / 2)) * scale);
		ctx.stroke();
		ctx.closePath();
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.endX * scale, this.endY * scale, this.length * scale, this.width * scale);
		//console.log(this.endX + "   " + this.endY);
	}
}