chrome.storage.sync.get('persona', function(data) {
	var head = document.getElementsByTagName("head")[0];
	var link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "personas/"+data.persona+"/style.css";
	head.appendChild(link);
	
	document.body.style.backgroundImage = "url('chrome-extension://__MSG_@@extension_id__/personas/"+data.persona+"/images/background.png') no-repeat cover";
});

let greeting = document.getElementById('greeting');

var date = new Date();

chrome.storage.local.get('lang', function(data) {
	let time = date.getHours();
	let text;
	for (entry of data.lang.greetings) {
		if (time >= entry.from && time < entry.to) {
			text = entry.text;
			break;
		}
	}
	greeting.innerText = text;
});