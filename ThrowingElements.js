var startPositions = {dragging:0,speed:0.9};

function startThrow(event){
	startPositions.mouseX = event.clientX;
	startPositions.mouseY = event.clientY;
	startPositions.element = document.elementFromPoint(startPositions.mouseX, startPositions.mouseY);
	startPositions.left = document.elementFromPoint(startPositions.mouseX, startPositions.mouseY).getBoundingClientRect().left;
	startPositions.right = document.elementFromPoint(startPositions.mouseX, startPositions.mouseY).getBoundingClientRect().right;
	startPositions.top = document.elementFromPoint(startPositions.mouseX, startPositions.mouseY).getBoundingClientRect().top;
	startPositions.bottom = document.elementFromPoint(startPositions.mouseX, startPositions.mouseY).getBoundingClientRect().bottom;
	startPositions.previousX = event.clientX;
	startPositions.previousY = event.clientY;
	startPositions.momentumX = 0;
	startPositions.momentumY = 0;
	startPositions.dragging = 1;
}
function midThrow(event){
	if (startPositions.dragging == 1){
		startPositions.momentumX = event.clientX - startPositions.previousX;
		startPositions.momentumY = event.clientY - startPositions.previousY;
		X = Math.round(event.clientX - (startPositions.mouseX - startPositions.left));
		Y = Math.round(event.clientY - (startPositions.mouseY - startPositions.top));
		startPositions.element.style.left = X + "px";
		startPositions.element.style.top = Y + "px";
		startPositions.previousX = event.clientX;
		startPositions.previousY = event.clientY;
	}
}
function endThrow(){
	if (startPositions.dragging == 1){
		startPositions.dragging = 0;
		throwTail = setInterval(function(){
			X = startPositions.element.getBoundingClientRect().left + startPositions.momentumX;
			Y = startPositions.element.getBoundingClientRect().top + startPositions.momentumY;
			startPositions.element.style.left = X + "px";
			startPositions.element.style.top = Y + "px";
			startPositions.momentumX *= startPositions.speed;
			startPositions.momentumY *= startPositions.speed;
			if (startPositions.momentumX < 0.1 && startPositions.momentumX > -0.1 && startPositions.momentumY < 0.1 && startPositions.momentumY > -0.1)
				clearInterval(throwTail);
		}, 10);
	}
}