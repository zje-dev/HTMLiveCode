class Chef {
	constructor () {}
	CookElement (tag_name, parent, values, clickevent, text, forever) {
		if (tag_name == null) {
			console.error("ERROR: No tag name");
		} else {
			var element = document.createElement(tag_name);
			if (values != null) {if (typeof(values) == "object") {
				for (var i = 0; i < Object.keys(values).length; i++) {
					element.setAttribute(Object.keys(values)[i], values[Object.keys(values)[i]]);
				}
			}}
			if (text != null) {
				element.innerText = text;
			}
			if (clickevent != null) {
				element.addEventListener("click", clickevent);
			}
			if (parent == null) {
				return element;
			} else {
				parent.appendChild(element);
			}
			if (forever != null) {
				setInterval(function () {
					forever();
				}, 100);
			}
		}
	}
}
window.chef = new Chef();