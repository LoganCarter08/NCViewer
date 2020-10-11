class punchCirc {
	constructor(line, ident, colors, centX, centY, rad) {
		this.className = "punchCirc";
		this.lineNum = line;
		this.color = colors;
		this.endX = centX - (rad);
		this.endY = centY - (rad);
		this.radius = rad;
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
		
		ctx.lineTo((this.endX + (this.radius))* scale, (this.endY + (this.radius)) * scale);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc((this.endX + this.radius) * scale, (this.endY + this.radius) * scale, this.radius * scale, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		//console.log(this.endX + "   " + this.endY);
	}
}