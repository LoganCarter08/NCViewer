class arc {
	constructor(direction, endingX, endingY, centeringX, centeringY) {
		this.className = "arc";
		this.color = getColor();
		this.lineNum = getCurrentLineNum();
		if (direction == 1) {
			this.dir = false;//true; // 0 for CW, 1 for CCW
		} else {
			this.dir = true;//false;
		}
		var startX = 0;
		var startY = 0;
		
		//slope = (y2-y1)÷(x2-x1)
		//angle = arctan(slope)
		// need:
		// 		angle between arc start and center 		- need match 
		//		angle between arc end and center 		- need math 
		//		center 									- given in params
		//		radius									- calculate distance between end and center
		//		direction 								- given in params
		
		
		// the below lines will need modded with logic to find the arc start and end. 
		this.endX = endingX;
		this.endY = endingY;
		this.centerX = centeringX;
		this.centerY = centeringY;
	}
	
	getAngle(X1, Y1, X2, Y2) {
		return (((Math.atan2(Y2 - Y1, X2 - X1) * 180 / Math.PI) + 180) * (Math.PI / 180));
	}
	
	action(j) {
		if (isNaN(this.endX)){
			this.endX = listOfCommands[j - 1].endX;
		}
		
		if (isNaN(this.endY)){
			this.endY = listOfCommands[j - 1].endY;
		}
		
		if (isNaN(this.centerX)) {
			var countBack = j;
			while (listOfCommands[countBack].className != "arc") {
				countBack--;
			}
			this.centerX = listOfCommands[countBack].centerX;
		}
		
		if (isNaN(this.centerY)) {
			var countBack = j;
			while (listOfCommands[countBack].className != "arc") {
				countBack--;
			}
			this.centerY = listOfCommands[countBack].centerY;
		}
		
		var newCenterX;
		var newCenterY;
		if (arcCenter == 1) {
			// listOfCommands[j - 1].endX * scale, listOfCommands[j - 1].endY * scale
			this.newCenterX = listOfCommands[j - 1].endX + this.centerX;
			this.newCenterY = listOfCommands[j - 1].endY + this.centerY;
		} else {
			this.newCenterX = this.centerX;
			this.newCenterY = this.centerY;
		}
		
		//console.log(this.newCenterX + "   " + this.newCenterY);
		
		var endAngle = this.getAngle(this.endX, this.endY, this.newCenterX, this.newCenterY); // this is the end angle
		var startAngle = this.getAngle(listOfCommands[j - 1].endX,  listOfCommands[j - 1].endY, this.newCenterX, this.newCenterY); // this is the start angle
		
		if (startAngle == endAngle) {
			endAngle = startAngle + Math.PI * 2;
		}
		
		var rad = Math.sqrt(Math.pow(this.newCenterX - listOfCommands[j - 1].endX, 2) + Math.pow(this.newCenterY - listOfCommands[j - 1].endY, 2));
		// CenterX, CenterY, rad, startAng, endAng, CCW
		
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.strokeStyle = this.color;
		ctx.moveTo(listOfCommands[j - 1].endX * (scale / unitScale), listOfCommands[j - 1].endY * (scale / unitScale));
		
		ctx.arc(this.newCenterX * (scale / unitScale), this.newCenterY * (scale / unitScale), rad * (scale / unitScale), startAngle, endAngle, this.dir);
		
		ctx.stroke();
		ctx.closePath();
		//console.log(this.endX + "   " + this.endY);
	}
}