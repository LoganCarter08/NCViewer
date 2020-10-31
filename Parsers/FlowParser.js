function FlowParser(input, code) {
	origin = 0;
	setArcCenterAbs();
	
	//console.log(NCFile[1]);
	var myCommand = undefined; // command we will be adding to the list of movements
	var thisLine = input.split(",");
	if (getCurrentLineNum() + 1 >= code.length) {
		return;
	}
	var nextLine = code[getCurrentLineNum() + 1].split(",");
	
	// -1, 2, -2
	if (thisLine[6] == 2) {
		setColor("red");
	} else if (thisLine[6] == -2) {
		setColor("blue");
	} else {
		setColor("green");
	}
	
	if (listOfCommands[listOfCommands.length - 1].className == "origin" && thisLine.length > 2) {
		listOfCommands.push(new rapid(1, parseFloat(thisLine[0]), parseFloat(thisLine[1])));
	}
	
	if (thisLine[4] == 0 && thisLine[3] == 0) {
		// rapids have feedrate of 0, but look like lines otherwise. 
		// x , y, z, g, f, kerf, in/out
		// rapid 
		myCommand = new rapid(1, parseFloat(nextLine[0]), parseFloat(nextLine[1]));
	} else if (thisLine[3] == 0) {
		// x , y, z, g, f, kerf, in/out
		// line 
		myCommand = new line(parseFloat(nextLine[0]), parseFloat(nextLine[1]));
	} else if (thisLine[3] == 1) {
		// X, Y, Z, G, F, Kerf, in/out, I, J, K
		// CW arc 
		myCommand = new arc(0, parseFloat(nextLine[0]), parseFloat(nextLine[1]), parseFloat(thisLine[7]), parseFloat(thisLine[8]));
	} else if (thisLine[3] == -1) {
		// X, Y, Z, G, F, Kerf, in/out, I, J, K
		// CCW arc 
		myCommand = new arc(1, parseFloat(nextLine[0]), parseFloat(nextLine[1]), parseFloat(thisLine[7]), parseFloat(thisLine[8]));
	}
	
	return myCommand;
}