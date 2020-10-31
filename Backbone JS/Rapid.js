class rapid {
	constructor(typeOf, endingX, endingY) {
		this.className = "rapid";
		this.lineNum = getCurrentLineNum();
		this.type = typeOf; // 1 is head up and 0 is head down
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
		
		//var color = ctx.strokeStyle;
		ctx.beginPath();
		ctx.strokeStyle = "black";
		
		if (this.type == 1) {
			ctx.setLineDash([5,3]);
		} else {
			ctx.setLineDash([3, 5]);
		}
		ctx.moveTo(listOfCommands[j - 1].endX * (scale / unitScale), listOfCommands[j - 1].endY * (scale / unitScale));
		ctx.lineTo(this.endX * (scale / unitScale), this.endY * (scale / unitScale));
		ctx.stroke();
		ctx.closePath();
		//ctx.restore();
		//ctx.strokeStyle = color;
		//console.log(this.endX + "   " + this.endY);
	}
}