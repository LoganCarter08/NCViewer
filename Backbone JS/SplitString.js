// splitList is usually "XYIJ"
function splitString(str,splitList) {
	// go through splitList 
	// if str contains that splitList item then get value for it 
	// if str does not contain that splitList item then add a blank string 
	var resultArray = [];
	var placeHoldStr = "";
	for (var k = 0; k < splitList.length; k++) {
		if (str.includes(splitList[k])) {
			//console.log("----" + splitList[k]);
			//console.log("----" + str.indexOf(splitList[k]));
			var doAdd = false;
			for (var l = 0; l < str.length; l++) {
				if (doAdd) {
					placeHoldStr = placeHoldStr + str[l];
				}
				
				if (l < str.length && doAdd && splitList.includes(str[l + 1])) {
					doAdd = false;
				}
				if (splitList[k] == str[l]) { // turn this on to start recording
					doAdd = true;
				} else if (l == str.length - 1 || (k < splitList.length && splitList[k + 1] == str[l])) { 
					doAdd = false;
				} 
			}
			resultArray.push(placeHoldStr);
			placeHoldStr = "";
		} else {
			resultArray.push(placeHoldStr);
			//console.log("********" + splitList[k]);
		}
	}
	//console.log(resultArray);
	return resultArray;
}