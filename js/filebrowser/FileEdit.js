var fs = require("fs");
var filebrowser = function () {
	if (!document.getElementById("FB")) {
		function load (path) {
			document.getElementById("Fpath").setAttribute("value", path);
			fs.readdir(path, function (erro, file) {
				if (!erro) {
					while (document.getElementById("files").lastChild) {
						document.getElementById("files").lastChild.remove();
					}
					for (var i = 0; i < file.length; i++) {
						try {
							if (fs.statSync(path + file[i]).isFile()) {
								if (file[i][0] != ".") {
									var folder = chef.CookElement("DIV", null, {"title": "Double click for select this file"}, function () {
										load(folder_path);
									});
									var img = "./js/filebrowser/icons/file.png";
									switch (file[i].split(".")[file[i].split(".").length - 1]) {
										case "js":
											img = "./js/filebrowser/icons/js.png";
											break;
										case "css":
											img = "./js/filebrowser/icons/css.png";
											break;
										case "html":
											img = "./js/filebrowser/icons/html.png";
											break;
									}
									chef.CookElement("IMG", folder, {"src": img, "class": "iconFil"});
									chef.CookElement("BR", folder);
									var file_name = file[i];
									if (file[i].length > 8) {
										file_name = file[i].slice(0, 4) + "..";
									}
									chef.CookElement("SPAN", folder, {"value": file[i]}, null, file_name);
									document.getElementById("files").appendChild(folder);
								}
							} else if (fs.statSync(path + file[i]).isDirectory()) {
								if (file[i][0] != ".") {
									var file_name = file[i];
									if (file[i].length > 8) {
										file_name = file[i].slice(0, 4) + "..";
									}
									var folder = chef.CookElement("DIV", null, {"onclick": "folder_path += (this.childNodes[2].getAttribute('value') + '/')", "onmouseenter":
										"this.setAttribute('class', 'filex');this.childNodes[2].innerText = this.childNodes[2].getAttribute('value')",
									"onmouseout":
										("this.setAttribute('class', '');this.childNodes[2].innerText = '" + file_name+ "'")
									}, function () {
										load(folder_path);
									});
									chef.CookElement("IMG", folder, {"src": "./js/filebrowser/icons/folder.png", "class": "iconFil","onmouseenter":
										"this.parentNode.setAttribute('class', 'filex');this.parentNode.childNodes[2].innerText = this.parentNode.childNodes[2].getAttribute('value')",
									"onmouseout":
										("this.parentNode.setAttribute('class', '');this.parentNode.childNodes[2].innerText = '" + file_name+ "'")
									});
									chef.CookElement("BR", folder);
									chef.CookElement("SPAN", folder, {"value": file[i],"onmouseenter":
										"this.parentNode.setAttribute('class', 'filex')",
									"onmouseout":
										"this.parentNode.setAttribute('class', '')"}, null, file_name);
									document.getElementById("files").appendChild(folder);
								}
							}
						} catch (er) {}
					}
				} else {
					alert("An error has occurred");
					console.log(erro);
				}
			});
		}
		let FB = chef.CookElement("DIV", null, {"id": "FB", "style": "top: 16%;left: 23%;width: 50%;height: 60%;"});
		let TOP = chef.CookElement("CENTER", null);
		let BOT = chef.CookElement("CENTER", null);
		chef.CookElement("INPUT", TOP, {"type": "text", "id": "Fpath", "value": folder_path});
		chef.CookElement("INPUT", TOP, {"type": "button", "value": "Previous"}, function () {
			let FP = document.getElementById("Fpath").getAttribute("value");
			var FFP = "";
			for (var DT = 0; DT < (FP.split("/").length - 2); DT++) {
				FFP += (FP.split("/")[DT] + "/");
			}
			load(FFP);
		});
		chef.CookElement("INPUT", BOT, {"type": "button", "value": "Quit"}, function () {
			document.getElementById("FB").remove();
			document.getElementsByClassName("shadow")[0].remove();
		});
		chef.CookElement("INPUT", BOT, {"type": "button", "value": "  +  ", "title": "Zoom in"}, function () {
			let theval = BOT.parentNode.getAttribute("style")
				.replace("top: ", '')
				.replace("left: ", '')
				.replace("width: ", '').replace("height: ", '').replace("%;", '').replace("%;", '').replace("%;", '').replace("%;", '');
			let valthe = ('top: '+(parseInt(theval.slice(0,2)) - 1)+
				'%;left: '+(parseInt(theval.slice(2,4)) - 1)+
				'%;width: '+(parseInt(theval.slice(4,6)) + 3)+
				'%;height: '+(parseInt(theval.slice(6,8)) + 3)+"%;");
			if (valthe != "top: 13%;left: 20%;width: 59%;height: 69%;")
				BOT.parentNode.setAttribute("style", valthe);
		});
		chef.CookElement("INPUT", BOT, {"type": "button", "value": "  -  ", "title": "Zoom out"}, function () {
			let theval = BOT.parentNode.getAttribute("style")
				.replace("top: ", '')
				.replace("left: ", '')
				.replace("width: ", '').replace("height: ", '').replace("%;", '').replace("%;", '').replace("%;", '').replace("%;", '');
			let valthe = ('top: '+(parseInt(theval.slice(0,2)) + 1)+
				'%;left: '+(parseInt(theval.slice(2,4)) + 1)+
				'%;width: '+(parseInt(theval.slice(4,6)) - 3)+
				'%;height: '+(parseInt(theval.slice(6,8)) - 3)+"%;");
			if (valthe != "top: 23%;left: 30%;width: 29%;height: 39%;")
			BOT.parentNode.setAttribute("style", valthe);
		});
		chef.CookElement("INPUT", BOT, {"type": "button", "value": "Select current directory"});
		FB.appendChild(TOP);
		chef.CookElement("DIV", FB, {"id": "files"});
		FB.appendChild(BOT);
		document.body.appendChild(FB);
		chef.CookElement("DIV", document.body, {"class": "shadow"});
		load(folder_path);
	}
}
