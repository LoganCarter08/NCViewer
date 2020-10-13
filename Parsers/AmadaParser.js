function AmadaParser(j, input) {
	origin = 0;
	arcCenter = 1;
	
	//console.log(NCFile[1]);
	var myCommand; // command we will be adding to the list of movements
	
	if (input.includes("E4")) {
		currentColor = "red";
	} else if (input.includes("E3")) {
		currentColor = "green";
	} else if (input.includes("E2")) {
		currentColor = "cyan";
	} else if (input.includes("E10")) {
		currentColor = "blue";
	} else if (input.includes("G01")) {
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
	} else if (input.includes("X") && input.includes("Y")) {
		var createTool = false;
		var toolNum = -1;
		if (input.includes("T")) { // punch tool active 
			createTool = true;
			toolNum = parseFloat(input.split("T")[1]);
		}
		var tempStr = input.split(/X|Y|T/);
		myCommand = createPunchTool(createTool, j, toolNum, "brown", tempStr[1], tempStr[2]);
	}
	
	if (typeof(myCommand) != "undefined") {
		listOfCommands.push(myCommand);
	}
}