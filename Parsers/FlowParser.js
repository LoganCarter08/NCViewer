function FlowParser(j, input, code) {
	origin = 0;
	this.arcCenter = 0;
	
	//console.log(NCFile[1]);
	var myCommand = undefined; // command we will be adding to the list of movements
	var thisLine = input.split(",");
	if (j + 1 >= code.length) {
		return;
	}
	var nextLine = code[j + 1].split(",");
	
	// -1, 2, -2
	if (thisLine[6] == 2) {
		currentColor = "red";
	} else if (thisLine[6] == -2) {
		currentColor = "blue";
	} else {
		currentColor = "green";
	}
	
	if (listOfCommands[listOfCommands.length - 1].className == "origin" && thisLine.length > 2) {
		listOfCommands.push(new rapid(j, 1, parseFloat(thisLine[0]), parseFloat(thisLine[1])));
	}
	
	if (thisLine[4] == 0 && thisLine[3] == 0) {
		// rapids have feedrate of 0, but look like lines otherwise. 
		// x , y, z, g, f, kerf, in/out
		// rapid 
		myCommand = new rapid(j, 1, parseFloat(nextLine[0]), parseFloat(nextLine[1]));
	} else if (thisLine[3] == 0) {
		// x , y, z, g, f, kerf, in/out
		// line 
		myCommand = new line(j, currentColor, parseFloat(nextLine[0]), parseFloat(nextLine[1]));
	} else if (thisLine[3] == 1) {
		// X, Y, Z, G, F, Kerf, in/out, I, J, K
		// CW arc 
		myCommand = new arc(j, currentColor, 0, parseFloat(nextLine[0]), parseFloat(nextLine[1]), parseFloat(thisLine[7]), parseFloat(thisLine[8]));
	} else if (thisLine[3] == -1) {
		// X, Y, Z, G, F, Kerf, in/out, I, J, K
		// CCW arc 
		myCommand = new arc(j, currentColor, 1, parseFloat(nextLine[0]), parseFloat(nextLine[1]), parseFloat(thisLine[7]), parseFloat(thisLine[8]));
	}
	
	if (typeof(myCommand) != "undefined") {
		listOfCommands.push(myCommand);
	}
}