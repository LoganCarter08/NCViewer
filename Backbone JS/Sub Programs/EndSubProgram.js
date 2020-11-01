class endSubProgram {
	constructor(callName) {
		this.className = "endSub";
		this.call = callName;
		this.lineNum = getCurrentLineNum();
	}
	
	action(j) {
		//console.log(this.endX + "   " + this.endY);
	}
}