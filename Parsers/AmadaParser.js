function AmadaParser(input) {
	origin = 0;
	setArcCenterInc();
	
	var myCommand; // command we will be adding to the list of movements
	
	var mySplitInput = splitString(input,"XYIJ");
	if (input.includes("G71")) {
		setMetric();
	} else if (input.includes("G70")) {
		setImperial();
	}
	
	if (input.includes("E4")) {
		setColor("red");
	} else if (input.includes("E3")) {
		setColor("green");
	} else if (input.includes("E2")) {
		setColor("cyan");
	} else if (input.includes("E10")) {
		setColor("blue");
	} else if (input.includes("G01")) {
		myCommand = new line(parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]));
	} else if (input.includes("G00") && input != "G00G40") {
		myCommand = new rapid(1, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]));
	} else if ((input.includes("G03") || input.includes("G02")) && !input.includes("R")) { // I hate that I did this. Clean it up later you worthless human
		// 						line, direction, endingX, endingY, centeringX, centeringY)
		if (input.includes("G02")) {
			myCommand = new arc(0, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]), parseFloat(mySplitInput[2]), parseFloat(mySplitInput[3]));
		} else {
			myCommand = new arc(1, parseFloat(mySplitInput[0]), parseFloat(mySplitInput[1]), parseFloat(mySplitInput[2]), parseFloat(mySplitInput[3]));
		}
	} else if (input.includes("X") && input.includes("Y")) {
		var createTool = false;
		var toolNum = -1;
		if (input.includes("T")) { // punch tool active 
			createTool = true;
			toolNum = parseFloat(input.split("T")[1]);
		}
		
		if (input.includes("C")) {
			punchToolAngle = parseFloat(input.split("C")[1]);
		}
		var tempStr = input.split(/X|Y|T/);
		myCommand = createPunchTool(createTool, toolNum, "brown", tempStr[1], tempStr[2], punchToolAngle);
	}
	
	//if (typeof(myCommand) != "undefined") {
	//	listOfCommands.push(myCommand);
	//}
	return myCommand;
}