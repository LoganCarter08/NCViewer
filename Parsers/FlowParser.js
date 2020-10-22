function FlowParser(j, input) {
	origin = 0;
	arcCenter = 1;
	
	//console.log(NCFile[1]);
	var myCommand; // command we will be adding to the list of movements
	var thisLine = input.split(",");
	// x , y, z, g, f, kerf, in/out
	
	// rapids have feedrate of 0, but look like lines otherwise. 
	
	
	if (input.includes("G01")) {
		var tempStr = input.split("G01")[1].replace("X","").split("Y");
		if (!isNaN(tempStr[0]) && !isNaN(tempStr[1])) {
			myCommand = new line(j, currentColor, parseFloat(tempStr[0]), parseFloat(tempStr[1]));
		}
	} else if (input.includes("G00")) {
		var tempStr = input.replace("G00","").replace("G40","").replace("G41","").replace("X","").split("Y");
		if (!isNaN(tempStr[0]) && !isNaN(tempStr[1])) {
			myCommand = new rapid(j, 1, parseFloat(tempStr[0]), parseFloat(tempStr[1]));
		}
	} else if ((input.includes("G03") || input.includes("G02")) && !input.includes("R")) {
		//split(/,| /) 
		var tempStr = input.replace("G02","").replace("G03","").split(/X|Y|I|J/);

		if (!isNaN(tempStr[1]) && !isNaN(tempStr[2]) && !isNaN(tempStr[3]) && !isNaN(tempStr[4])) {
			// 						line, direction, endingX, endingY, centeringX, centeringY)
			if (input.includes("G02")) {
				myCommand = new arc(j, currentColor, 0, parseFloat(tempStr[1]), parseFloat(tempStr[2]), parseFloat(tempStr[3]), parseFloat(tempStr[4]));
			} else {
				myCommand = new arc(j, currentColor, 1, parseFloat(tempStr[1]), parseFloat(tempStr[2]), parseFloat(tempStr[3]), parseFloat(tempStr[4]));
			}
		}
	}
	
	if (typeof(myCommand) != "undefined") {
		listOfCommands.push(myCommand);
	}
}