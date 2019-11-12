var filebrowser = function () {
	chef.CookElement("DIV", document.body, {"class": "shadow"});
	var element = chef.CookElement("DIV", null, {"id": "iframe"});
	chef.CookElement("DIV", element);
	document.body.appendChild(element);
}
