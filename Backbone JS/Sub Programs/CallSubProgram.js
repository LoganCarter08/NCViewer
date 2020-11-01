class callSubProgram {
	constructor(callName, xOrig, yOrig, rot) {
		this.className = "callSub";
		this.call = callName;
		this.lineNum = getCurrentLineNum();
		this.endX = xOrig;
		this.endY = yOrig;
		this.rotation = rot;
		subProgramCallList.add(this);
	}
	
	action(j) {
		//console.log(this.endX + "   " + this.endY);
	}
}