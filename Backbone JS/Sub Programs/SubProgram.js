class SubProgram {
	constructor(callName) {
		this.className = "sub";
		this.call = callName;
		this.commands = [];
	}
	
	addCommand(com) {
		this.commands.add(com);
	}
	
	action(j) {
		//console.log(this.endX + "   " + this.endY);
	}
}