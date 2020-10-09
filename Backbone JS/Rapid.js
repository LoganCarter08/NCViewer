class rapid {
	constructor(line, typeOf, endingX, endingY) {
		this.className = "rapid";
		this.lineNum = line;
		this.type = typeOf; // 1 is head up and 0 is head down
		this.endX = endingX;
		this.endY = endingY;
	}
	
	action(j) {
		//var color = ctx.strokeStyle;
		ctx.beginPath();
		ctx.strokeStyle = "black";
		
		if (this.type == 1) {
			ctx.setLineDash([5,3]);
		} else {
			ctx.setLineDash([3, 5]);
		}
		ctx.moveTo(listOfCommands[j - 1].endX * scale, listOfCommands[j - 1].endY * scale);
		ctx.lineTo(this.endX * scale, this.endY * scale);
		ctx.stroke();
		ctx.closePath();
		//ctx.restore();
		//ctx.strokeStyle = color;
		//console.log(this.endX + "   " + this.endY);
	}
}