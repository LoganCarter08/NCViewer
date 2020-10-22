var lastNum = -1;
var punchLength = -1;
var punchWidth = -1;
var punchRad = -1;
var punchRad = -1;
var lastType = -1;

function createPunchTool(newTool, line, num, colors, centX, centY, ang) {
	if (newTool) {
		lastType = parseFloat(prompt("What tool type is tool " + num + "? Please enter 0 for rectangle/square or 1 for circle.", ""));
		lastNum = num;
		if (lastType == 0) {
			punchLength = parseFloat(prompt("What is the length of tool " + num + "?", ""));
			punchWidth = parseFloat(prompt("What is the width of tool " + num + "?", ""));
		} else {
			punchRad = parseFloat(prompt("What is the diameter of tool " + num + "?", ""));
		}
	}
	if (lastType == 0) {
		return new punchRect(line, lastNum, colors, centX, centY, punchLength, punchWidth, ang);
	} else if (lastType != -1) {
		return new punchCirc(line, lastNum, colors, centX, centY, punchRad / 2);
	}
	
}