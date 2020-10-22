function AmadaParser(j, input) {
	origin = 0;
	arcCenter = 1;
	
	//console.log(NCFile[1]);
	var myCommand; // command we will be adding to the list of movements
	var mySplitInput = splitString(input,"XYIJ");
	
	
	if (input.includes("E4")) {
		currentColor = "red";
	} else if (input.includes("E3")) {
		currentColor = "green";
	} else if (input.includes("E2")) {
		currentColor = "cyan";
	} else if (input.includes("E10")) {
		currentColor = "blue";
	} else if (input.includes("G01")) {
		myCommand = new line(j, currentColor, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]));
	} else if (input.includes("G00") && input != "G00G40") {
		myCommand = new rapid(j, 1, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]));
	} else if ((input.includes("G03") || input.includes("G02")) && !input.includes("R")) { // I hate that I did this. Clean it up later you worthless human
		// 						line, direction, endingX, endingY, centeringX, centeringY)
		if (input.includes("G02")) {
			myCommand = new arc(j, currentColor, 0, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]), parseFloat(mySplitInput[2]), parseFloat(mySplitInput[3]));
		} else {
			myCommand = new arc(j, currentColor, 1, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]), parseFloat(mySplitInput[2]), parseFloat(mySplitInput[3]));
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